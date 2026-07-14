import rateLimit from "express-rate-limit";

// For login/register/password flows — brute-force & credential-stuffing protection
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts from this IP. Please try again in 15 minutes.",
  },
});

// For OTP verify/resend — tighter window, guards against OTP guessing/spam
export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many OTP requests from this IP. Please try again in 10 minutes.",
  },
});
