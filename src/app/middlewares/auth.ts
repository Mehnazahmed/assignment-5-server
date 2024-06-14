import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";
import AppError from "../errors/AppError";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Authentication token is missing"
        );
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role, userId } = decoded;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized  hi!"
        );
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(
        new AppError(httpStatus.UNAUTHORIZED, "Invalid authentication token")
      );
    }
  };
};

export default auth;
