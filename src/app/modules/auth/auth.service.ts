import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const userSignUpIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

const getUserByEmailFromDb = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,

    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // );

  return {
    accessToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

export const authServices = {
  userSignUpIntoDb,
  loginUser,
  getUserByEmailFromDb,
};
