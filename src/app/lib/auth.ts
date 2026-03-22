import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { envVars } from "../../config/env";
import { bearer, emailOTP } from "better-auth/plugins";
import { sendEmail } from "../utils/email";

export const auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // 🔐 Email + Password Auth
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  // 🌐 Google OAuth
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,

      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: Role.USER, // default role
          emailVerified: true,
        };
      },
    },
  },

  // ✉️ Email Verification
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: false,
    autoSignInAfterVerification: true,
  },

  // 👤 User fields mapping
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.USER,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      image: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
  },

  // 🔌 Plugins
  plugins: [
    bearer(),

    emailOTP({
      overrideDefaultEmailVerification: true,

      async sendVerificationOTP({ email, otp, type }) {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return;

        // ✉️ Email Verification
        if (type === "email-verification" && !user.emailVerified) {
          await sendEmail({
            to: email,
            subject: "Verify your email",
            templateName: "otp",
            templateData: {
              name: user.name,
              otp,
            },
          });
        }

        // 🔐 Forgot Password
        if (type === "forget-password") {
          await sendEmail({
            to: email,
            subject: "Reset your password",
            templateName: "forgetPass",
            templateData: {
              name: user.name,
              otp,
            },
          });
        }
      },

      expiresIn: 2 * 60, // 2 minutes
      otpLength: 6,
    }),
  ],

  // 🍪 Session config
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24,
    },
  },

  // 🌍 Trusted origins
  trustedOrigins: [
    envVars.BETTER_AUTH_URL || "http://localhost:5000",
    envVars.FRONTEND_URL,
  ],

  // 🔁 Redirect after Google login
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
  },

  // 🔒 Cookie security
  advanced: {
    useSecureCookies: envVars.NODE_ENV === "production",
  },
});
