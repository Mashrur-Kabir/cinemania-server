import { UserStatus } from "../../../generated/prisma/enums";
import { AppError } from "../../errors/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { IAuthUser } from "../../interfaces";
import {
  IRegisterUserPayload,
  ILoginUserPayload,
  IChangePasswordPayload,
  IBetterAuthSession,
} from "./auth.interface";
import { envVars } from "../../../config/env";
import { jwtHelpers } from "../../utils/jwt";
import { EmailValidator } from "../../utils/emailValidation";

const registerUserInDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, image } = payload;

  // 🛡️ 1. DISPOSABLE EMAIL CHECK
  if (EmailValidator.isDisposable(email)) {
    throw new AppError(
      status.BAD_REQUEST,
      "Disposable email addresses are not allowed. Please use a permanent email provider.",
    );
  }

  // 🛡️ 2. MX RECORD VERIFICATION (DNS)
  const isValidDomain = await EmailValidator.hasValidMX(email);
  if (!isValidDomain) {
    throw new AppError(
      status.BAD_REQUEST,
      "The email domain provided appears to be invalid or cannot receive mail.",
    );
  }

  // 🔴 EXISTING USER CHECK
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (!existingUser.emailVerified) {
      throw new AppError(
        status.BAD_REQUEST,
        "User already registered but email not verified. Please verify your email or request OTP again.",
      );
    }

    throw new AppError(status.CONFLICT, "User already exists with this email");
  }

  const data = await auth.api.signUpEmail({
    body: { name, email, password, image },
  });

  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register user");
  }

  const tokenPayload = {
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  };

  return {
    accessToken: tokenUtils.getAccessToken(tokenPayload),
    refreshToken: tokenUtils.getRefreshToken(tokenPayload),
    ...data,
  };
};

const loginUserInDB = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: { email, password },
  });

  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError(status.FORBIDDEN, "Your account is blocked.");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User not found.");
  }

  const tokenPayload = {
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  };

  return {
    ...data,
    accessToken: tokenUtils.getAccessToken(tokenPayload),
    refreshToken: tokenUtils.getRefreshToken(tokenPayload),
  };
};

const getMeFromDB = async (user: IAuthUser) => {
  const result = await prisma.user.findUnique({
    where: { id: user.id, isDeleted: false },
    include: {
      subscriptions: true, // Specific to Cinemania
      watchlist: { include: { media: true } }, // Show actual movies in watchlist
      reviews: true,
      notifications: { where: { isRead: false } }, // Fetch unread notifications
    },
  });

  if (!result) throw new AppError(status.NOT_FOUND, "User not found");
  return result;
};

const getNewTokenService = async (
  refreshToken: string,
  sessionToken: string,
) => {
  const sessionTokenData = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!sessionTokenData || !sessionTokenData.user) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Invalid session or user not found",
    );
  }

  const verifiedRefreshToken = jwtHelpers.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET,
  );

  const payload = verifiedRefreshToken as IAuthUser;

  if (!payload || !payload.id) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token payload");
  }

  const getNewAccessToken = tokenUtils.getAccessToken({
    userId: payload.id,
    role: payload.role,
    name: payload.name,
    email: payload.email,
    status: payload.status,
    isDeleted: payload.isDeleted,
    emailVerified: payload.emailVerified,
  });

  const getNewRefreshToken = tokenUtils.getRefreshToken({
    userId: payload.id,
    role: payload.role,
    name: payload.name,
    email: payload.email,
    status: payload.status,
    isDeleted: payload.isDeleted,
    emailVerified: payload.emailVerified,
  });

  const updatedSession = await prisma.session.update({
    where: {
      token: sessionToken, //Find the row with this token,
    },
    data: {
      //set token to the same value it already has. For a standard application, keeping the sessionToken the same but extending the expiry is perfectly fine. It’s exactly how most session managers work to avoid "session thrashing."
      token: sessionToken,
      // Standard: Refresh should extend the session by a meaningful amount,
      // e.g., 7 days from NOW, or keep the original (e.g., 'one-month') date.
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      updatedAt: new Date(),
    },
  });

  return {
    accessToken: getNewAccessToken,
    refreshToken: getNewRefreshToken,
    sessionToken: updatedSession.token, //<-- we don't need the whole session. just the token
  };
};

const changePasswordInDB = async (
  payload: IChangePasswordPayload,
  sessionToken: string,
) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  if (!session) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const { oldPassword, newPassword } = payload;

  // Better-Auth internal API call
  // This automatically verifies the old password and updates to the new one
  const result = await auth.api.changePassword({
    body: {
      newPassword,
      currentPassword: oldPassword,
      revokeOtherSessions: true, // Recommended: Log out other devices for security
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  if (!result) {
    throw new AppError(
      status.BAD_REQUEST,
      "Failed to change password. Ensure old password is correct.",
    );
  }

  if (session.user.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        needPasswordChange: false,
      },
    });
  }

  //after this previous sessions will be removed. so we need to generate access and refresh token again:
  const accessToken = tokenUtils.getAccessToken({
    userId: result.user.id,
    role: result.user.role,
    name: result.user.name,
    email: result.user.email,
    status: result.user.status,
    isDeleted: result.user.isDeleted,
    emailVerified: result.user.emailVerified,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    userId: result.user.id,
    role: result.user.role,
    name: result.user.name,
    email: result.user.email,
    status: result.user.status,
    isDeleted: result.user.isDeleted,
    emailVerified: result.user.emailVerified,
  });

  return {
    ...result,
    accessToken,
    refreshToken,
  };
};

const logoutUserInDB = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  return result;
};

const verifyEmailForUser = async (email: string, otp: string) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp,
    },
  });

  if (result && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });
  }
};

const resendVerificationOTP = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email already verified");
  }

  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  await auth.api.sendVerificationEmail({
    body: { email },
  });
};

const forgetPasswordForUser = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User not found or deleted");
  }

  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email,
    },
  });
};

const resetPasswordForUser = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User not found or deleted");
  }

  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword,
    },
  });

  if (isUserExist.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: isUserExist.id,
      },
      data: {
        needPasswordChange: false,
      },
    });
  }

  await prisma.session.deleteMany({
    //delete session across all device, forcing the user to log in again.
    where: {
      userId: isUserExist.id,
    },
  });
};

const googleLoginSuccessForUser = async (session: IBetterAuthSession) => {
  const { user } = session;

  // Check if the user exists in your DB (Better-Auth handles the creation,
  // but we check status/deletion for security)
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser || dbUser.isDeleted || dbUser.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User account not found or deleted.");
  }

  if (dbUser.status === UserStatus.BLOCKED) {
    throw new AppError(status.FORBIDDEN, "Your account is blocked.");
  }

  const tokenPayload = {
    userId: dbUser.id,
    role: dbUser.role,
    name: dbUser.name,
    email: dbUser.email,
    status: dbUser.status,
    isDeleted: dbUser.isDeleted,
    emailVerified: dbUser.emailVerified,
  };

  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);

  return { accessToken, refreshToken };
};

export const AuthService = {
  registerUserInDB,
  loginUserInDB,
  getMeFromDB,
  getNewTokenService,
  changePasswordInDB,
  logoutUserInDB,
  verifyEmailForUser,
  resendVerificationOTP,
  forgetPasswordForUser,
  resetPasswordForUser,
  googleLoginSuccessForUser,
};
