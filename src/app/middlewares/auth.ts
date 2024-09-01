import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      const token = req.headers.authorization?.split(" ")[1];

      // checking if the token is missing
      if (!token) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role, userEmail, userId, iat } = decoded;
      // console.log("decoded", decoded);
      // checking if the user is exist
      const user = await User.isUserExistsByEmail(userEmail);

      // console.log("user", user);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized  hi!"
        );
      }

      req.user = decoded as JwtPayload;
      // console.log(req.user);
      next();
    }
  );
};

export default auth;
