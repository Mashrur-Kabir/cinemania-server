import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { CookieUtils } from "../../utils/cookie";
import { envVars } from "../../../config/env";
import { auth } from "../../lib/auth";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUserInDB(req.body);
  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Welcome to CineMania! Registration successful.",
    data: { ...rest },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUserInDB(req.body);
  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully!",
    data: { ...rest },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user!");
  }
  const result = await AuthService.getMeFromDB(req.user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User profile retrieved successfully!",
    data: result,
  });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const sessionToken = req.cookies["better-auth.session_token"];

  if (!refreshToken || !sessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Session tokens are missing!");
  }

  const result = await AuthService.getNewTokenService(
    refreshToken,
    sessionToken,
  );

  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, result.sessionToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token regenerated successfully!",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.changePasswordInDB(req.body, sessionToken);

  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, result.token as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password updated successfully!",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = req.cookies["better-auth.session_token"];
  await AuthService.logoutUserInDB(sessionToken);

  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: "none" as const,
  };

  CookieUtils.clearCookie(res, "accessToken", cookieOptions);
  CookieUtils.clearCookie(res, "refreshToken", cookieOptions);
  CookieUtils.clearCookie(res, "better-auth.session_token", cookieOptions);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged out successfully!",
    data: null,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await AuthService.verifyEmailForUser(email, otp);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Email verified successfully!",
    data: null,
  });
});

const resendOTP = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resendVerificationOTP(req.body.email);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "OTP resent successfully!",
    data: null,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgetPasswordForUser(req.body.email);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset OTP sent to your email.",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  await AuthService.resetPasswordForUser(email, otp, newPassword);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset successful! Please login again.",
    data: null,
  });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = req.cookies["better-auth.session_token"];

  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }

  const session = await auth.api.getSession({
    headers: new Headers({
      Cookie: `better-auth.session_token=${sessionToken}`,
    }),
  });

  if (!session || !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=session_invalid`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await AuthService.googleLoginSuccessForUser(session as any);

  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);

  // Assuming you use the same EJS success page logic
  res.render("googleSuccess", {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    sessionToken,
    user: session.user,
    frontendUrl: envVars.FRONTEND_URL,
    redirectPath: "/dashboard",
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logoutUser,
  verifyEmail,
  resendOTP,
  forgetPassword,
  resetPassword,
  googleLoginSuccess,
};
