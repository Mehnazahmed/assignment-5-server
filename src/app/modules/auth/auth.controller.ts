import httpStatus, { OK } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import { NextFunction, Request, Response } from "express";
import config from "../../config";

// const usersignUp = catchAsync(async (req, res) => {
//   const userData = req.body;

//   const result = await authServices.userSignUpIntoDb(userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User registered successfully",
//     data: result,
//   });
// });

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    token: accessToken,
    data: result.data,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

// const forgetPassword = catchAsync(
//   async (req: Request & { user?: any }, res) => {
//     const userId = req.body.id;
//     const result = await AuthServices.forgetPassword(userId);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Reset link is generated succesfully!",
//       data: result,
//     });
//   }
// );

//check availability

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
  loginUser,
  checkAvailability,

  refreshToken,
};
