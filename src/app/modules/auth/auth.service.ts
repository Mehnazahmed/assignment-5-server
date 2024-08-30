import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { findAvailableSlots } from "../booking/booking.const";
import { Booking } from "../booking/booking.model";

// const userSignUpIntoDb = async (userData: TUser) => {
//   const result = await User.create(userData);

//   return result;
// };

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

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    userId: user._id,

    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,

    data: {
      // _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userEmail, userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail);
  // const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    userId: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

// const forgetPassword = async (userId: string) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
//   }

//   const jwtPayload = {
//     userEmail: user.email,
//     role: user.role,
//   };

//   const resetToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     "10m"
//   );

//   const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken} `;

//   sendEmail(user.email, resetUILink);

//   console.log(resetUILink);
// };

const checkAvailabilityFromDB = async (date: string) => {
  const bookingDate = date ? new Date(date) : new Date();
  const formattedDate = bookingDate.toISOString().split("T")[0];

  // Fetch bookings for the specified date
  const bookings = await Booking.find({
    date: new Date(formattedDate),
    isBooked: "confirmed",
  });

  // Find available slots
  const availableSlots = findAvailableSlots(bookings);

  // console.log("Bookings:", bookings); // Debug: Print fetched bookings
  // console.log("Available Slots:", availableSlots); // Debug: Print available slots

  return availableSlots;
};

export const authServices = {
  loginUser,
  getUserByEmailFromDb,
  checkAvailabilityFromDB,
  refreshToken,
};
