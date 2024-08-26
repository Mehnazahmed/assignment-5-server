import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// const createUser = catchAsync(async (req, res) => {
//   const userData = req.body;
//   const file = req.file;

//   const result = await UserServices.createUserIntoDB(file, userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User is created succesfully",
//     data: result,
//   });
// });
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const file = req.file;
  const result = await UserServices.createUserIntoDB(file, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is registered successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body;
  const file = req.file;
  const result = await UserServices.createAdminIntoDB(file, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createUser,
};
