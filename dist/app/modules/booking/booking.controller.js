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
        const userInfo = yield user_model_1.User.isUserExistsByEmail(email);
        const userId = userInfo._id;
        const transactionId = `TXN-${Date.now()}`;
        if (!userData) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User authentication failed");
        }
        const { facility, date, startTime, endTime } = req.body;
        const bookingData = {
            facility,
            date: new Date(date),
            startTime,
            endTime,
            user: new mongoose_1.default.Types.ObjectId(userId),
            payableAmount: 0,
            paymentStatus: "pending",
            isBooked: "pending",
            transactionId,
        };
        const newBooking = yield booking_service_1.bookingServices.createBookingIntoDB(bookingData);
        // Send a successful response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Booking created successfully",
            data: newBooking,
            // {
            //   _id: newBooking._id,
            //   facility: newBooking.facility.toString(),
            //   date: newBooking.date.toISOString().split("T")[0],
            //   startTime: newBooking.startTime,
            //   endTime: newBooking.endTime,
            //   user: newBooking.user.toString(),
            //   payableAmount: newBooking.payableAmount,
            //   isBooked: newBooking.isBooked,
            // },
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
const getBookingByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const booking = yield booking_service_1.bookingServices.getBookingByUserIdFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: booking,
    });
});
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
//     const availableSlots = await bookingServices.checkAvailabilityFromDB(
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
    getBookingByUserId,
};
