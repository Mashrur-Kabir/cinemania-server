/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/middlewares/checkAuthOptional.ts
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import { jwtHelpers } from "../utils/jwt";
import { IAuthUser } from "../interfaces/userInterface";

export const checkAuthOptional = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 🎯 THE FIX: Try headers, then parsed cookies, then raw cookie header
    let token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token && req.headers.cookie) {
      // Manual parse for RSC requests if cookie-parser isn't active
      const cookies = req.headers.cookie.split(";").reduce((acc: any, curr) => {
        const [key, value] = curr.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});
      token = cookies.accessToken;
    }

    if (!token) {
      // No token found? Proceed as guest (req.user remains undefined)
      return next();
    }

    try {
      const decoded = jwtHelpers.verifyToken(
        token,
        envVars.ACCESS_TOKEN_SECRET,
      ) as IAuthUser;

      req.user = decoded;

      // 🕵️‍♂️ DEBUG: Uncomment this to verify user identity in your backend terminal
      // console.log(`Authenticated: ${req.user.name} (${req.user.role})`);

      next();
    } catch (_error) {
      // Proceed as guest on invalid/expired token
      next();
    }
  };
};
