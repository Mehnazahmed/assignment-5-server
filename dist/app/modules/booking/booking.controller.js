"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        const email = userData.userEmail;
        // console.log(user);
        const userInfo = yield user_model_1.User.isUserExistsByEmail(email);
        console.log(userInfo);
        const userId = userInfo._id;
        // console.log("u", userId);
        if (!userData) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User authentication failed");
        }
        const { facility, user, date, startTime, endTime } = req.body;
        const bookingData = {
            facility,
            date: new Date(date),
            startTime,
            endTime,
            user: new mongoose_1.default.Types.ObjectId(userId),
            // user: new mongoose.Types.ObjectId(userId),
            payableAmount: 0,
            isBooked: "confirmed",
        };
        const newBooking = yield booking_service_1.bookingServices.createBookingIntoDB(bookingData);
        // Send a successful response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Booking created successfully",
            data: newBooking,
        });
    }
    catch (error) {
        next(error);
    }
}));
//get all bookings
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_service_1.bookingServices.getAllBookingsFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "api is not valid");
    }
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.user;
    console.log(req.user);
    console.log("last", userEmail);
    const bookings = yield booking_service_1.bookingServices.getBookingsByUser(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: bookings,
    });
}));
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.bookingServices.deleteBookingFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
// const checkAvailability = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date } = req.query;
//     const availableSlots = await bookingServices.checkAvailabilityFromDb(
//       date as string
//     );
//     // Send the response
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Availability checked successfully",
//       data: availableSlots,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
exports.bookingControllers = {
    createBooking,
    getAllBookings,
    deleteBooking,
    getUserBookings,
};
