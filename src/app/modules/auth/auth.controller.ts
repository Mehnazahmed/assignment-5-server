import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const usersignUp = catchAsync(async (req, res) => {
  const { user: userData } = req.body;

  const result = await authServices.userSignUpIntoDb(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const authControllers = {
  usersignUp,
};
