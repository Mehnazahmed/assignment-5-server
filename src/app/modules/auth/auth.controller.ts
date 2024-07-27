import httpStatus, { OK } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import { NextFunction, Request, Response } from "express";
import { bookingServices } from "../booking/booking.service";

const usersignUp = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await authServices.userSignUpIntoDb(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    token: result.accessToken,
    data: result.data,
  });
});

const checkAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;
    const availableSlots = await authServices.checkAvailabilityFromDB(
      date as string
    );

    console.log("Available Slots:", availableSlots); // Debugging line

    // Send the response
    res.json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability checked successfully",
      data: availableSlots,
    });
  } catch (error) {
    next(error);
  }
};

export const authControllers = {
  usersignUp,
  loginUser,
  checkAvailability,
};
