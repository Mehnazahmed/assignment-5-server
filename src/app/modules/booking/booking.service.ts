import mongoose from "mongoose";
import { Facility } from "../facility/facility.model";
import { initialPayment } from "../payment/payment.utils";
import { User } from "../user/user.model";

import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { calculatePayableAmount } from "./booking.utils";

// const createBookingIntoDB = async (payload: TBooking) => {
//   const result = await Booking.create(payload);

//   return result;
// };
const createBookingIntoDB = async (payload: TBooking) => {
  const {
    date,
    startTime,
    endTime,
    facility: facilityId,
    user: userId,
  } = payload;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  const facility = await Facility.findById(facilityId);
  if (!facility) {
    throw new Error("Facility not found.");
  }
  const dateString = date.toISOString().split("T")[0];
  const startTimeFormatted = `${dateString}T${startTime}:00`;
  const endTimeFormatted = `${dateString}T${endTime}:00`;

  // Construct Date objects
  const startTimeDate = new Date(startTimeFormatted);
  const endTimeDate = new Date(endTimeFormatted);

  const pricePerHour = facility.pricePerHour;
  const payableAmount = calculatePayableAmount(
    startTimeDate,
    endTimeDate,
    pricePerHour
  );

  const transactionId = `TXN-${Date.now()}`;

  // Check for overlapping bookings
  const overlappingBooking = await Booking.findOne({
    date,
    facilityId,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $lte: endTime, $gt: startTime } },
    ],
  });

  if (overlappingBooking) {
    throw new Error(
      "The facility is unavailable during the requested time slot."
    );
  }

  const bookingPayload = {
    ...payload,
    transactionId,
  };
  // If no overlapping booking is found, create the booking
  const result = await Booking.create(bookingPayload);
  console.log(result);
  const paymentData = {
    transactionId: transactionId,
    amount: payableAmount,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };

  const paymentSession = await initialPayment(paymentData);

  console.log(paymentSession);
  const newresult = paymentSession;

  return newresult;
  // return { result, newresult };
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    {
      new: true,
    }
  ).populate("facility");
  return result;
};

const getBookingByUserIdFromDB = async (userId: string) => {
  try {
    // Querying directly as a string
    const booking = await Booking.findOne({ "user._id": userId })
      .populate("facility")
      .populate("user");

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// const getBookingsByUser = async (userEmail: string) => {
//   try {
//     // Step 1: Query the User by email
//     const user = await User.findOne({ email: userEmail });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const userId = user._id;

//     const userBookings = await Booking.find({ user: userId }).populate(
//       "facility"
//     );

//     return userBookings;
//   } catch (error) {
//     console.error("Error in getBookingsByUser:", error);
//     throw error;
//   }
// };

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  deleteBookingFromDB,

  getBookingByUserIdFromDB,
};
