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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getSingleUserByEmailFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});
const getSingleUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await UserServices.getSingleUserByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUserByEmail,
  getSingleUserById,
};
