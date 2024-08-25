import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (
  file: any,

  payload: TUser
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.role = "user";

  userData.email = payload.email;

  if (file) {
    const imageName = `${userData._id}${payload?.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profileImg = secure_url as string;
  }

  // create a user
  const newUser = await User.create([userData]); // array

  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return newUser;
};

const createAdminIntoDB = async (
  file: any,

  payload: TUser
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.role = "admin";

  userData.email = payload.email;

  if (file) {
    const imageName = `${userData._id}${payload?.name}`;
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profileImg = secure_url as string;
  }

  const newAdmin = await User.create([payload]);

  if (!newAdmin.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
  }

  return newAdmin;
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
