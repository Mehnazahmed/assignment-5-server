import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import { findAvailableSlots } from "../booking/booking.const";
import { Booking } from "../booking/booking.model";

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
    // userId: user._id,

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
  //   config.jwt_refresh_expires_in as string
  // );

  return {
    accessToken,
    // refreshToken,
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
  userSignUpIntoDb,
  loginUser,
  getUserByEmailFromDb,
  checkAvailabilityFromDB,
};
