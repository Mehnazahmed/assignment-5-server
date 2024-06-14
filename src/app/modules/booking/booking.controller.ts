import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { TBooking, TBookingData } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { User } from "../user/user.model";

const createBooking = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const email = user.userEmail;
      console.log(user);

      const userData = await User.isUserExistsByEmail(email);
      // console.log(userData);
      const userId = userData._id;

      if (!user) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "User authentication failed"
        );
      }

      const { facility, date, startTime, endTime } = req.body;

      const bookingData: TBooking = {
        facility,
        date: new Date(date),
        startTime,
        endTime,
        user: user._id,
        payableAmount: 0,
        isBooked: "confirmed",
      };

      const newBooking = await bookingServices.createBookingIntoDB(bookingData);

      // Send a successful response
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,

        message: "Booking created successfully",
        data: { newBooking, user: userId },
      });
    } catch (error) {
      next(error);
    }
  }
);

//get all bookings

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

const checkAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;
    const availableSlots = await bookingServices.checkAvailabilityFromDb(
      date as string
    );

    // Send the response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Availability checked successfully",
      data: availableSlots,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingControllers = {
  createBooking,
  getAllBookings,
  deleteBooking,
  checkAvailability,
};
