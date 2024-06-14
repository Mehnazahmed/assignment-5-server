import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { facility, date, startTime, endTime } = req.body;

    // Ensure date is a Date object
    const bookingDate = new Date(date);

    // Ensure startTime and endTime are in HH:MM:SS format
    const formattedStartTime = `${startTime}:00`;
    const formattedEndTime = `${endTime}:00`;

    // Check if the facility is available during the requested time slot
    const existingBooking = await Booking.findOne({
      facility,
      date: bookingDate,
      $or: [
        { startTime: { $lt: formattedEndTime, $gte: formattedStartTime } },
        { endTime: { $gt: formattedStartTime, $lte: formattedEndTime } },
      ],
    });

    if (existingBooking) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Facility is unavailable during the requested time slot"
      );
    }

    // Get the user ID from the authenticated user's token
    // const user = req.user?._id;

    // if (!user) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     "User authentication failed or user not found"
    //   );
    // }

    // Create the booking
    const bookingData: TBooking = {
      facility,
      date: bookingDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      // user,
      payableAmount: 0, // This will be calculated in the pre-save hook
      isBooked: "confirmed",
    };

    const newBooking = await bookingServices.createBookingIntoDB(bookingData);

    // Send the response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingControllers = {
  createBooking,
};
