import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request & { user?: any }, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(
    req.file,

    userData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request & { user?: any }, res) => {
  const { admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,

    adminData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  createAdmin,
};
