/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// const createUserIntoDB = async (file: any, payload: TUser) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   if (file) {
//     const imageName = `${userData._id}${payload?.name}`;
//     const path = file?.path;

//     //send image to cloudinary
//     const { secure_url } = await sendImageToCloudinary(imageName, path);
//     payload.profileImg = secure_url as string;
//   }

//   // create a user
//   const newUser = await User.create([userData]); // array

//   if (!newUser.length) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
//   }

//   return newUser;
// };

const createUserIntoDB = async (file: any, payload: TUser) => {
  // create a user object
  // const userData: Partial<TUser> = {};
  payload.isDeleted = false;

  if (file) {
    const imageName = `${payload?.name}`;
    // const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, file.buffer);
    payload.profileImg = secure_url as string;
  }

  // create a user
  const newUser = await User.create([payload]); // array

  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return newUser;
};

const createAdminIntoDB = async (file: any, payload: TUser) => {
  // create a user object
  // const userData: Partial<TUser> = {};
  payload.isDeleted = false;

  if (file) {
    const imageName = `${payload?.name}`;
    // const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, file.buffer);
    payload.profileImg = secure_url as string;
  }
  const newAdmin = await User.create([payload]);

  if (!newAdmin.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
  }

  return newAdmin;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserByEmailFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};
const getSingleUserByIdFromDB = async (id: string) => {
  const result = await User.findById(id);
  console.log(id);
  return result;
};

const updateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getAllUsersFromDB,
  getSingleUserByEmailFromDB,
  getSingleUserByIdFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
