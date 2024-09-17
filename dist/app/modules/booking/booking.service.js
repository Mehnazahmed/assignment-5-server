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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const facility_model_1 = require("../facility/facility.model");
const payment_utils_1 = require("../payment/payment.utils");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const booking_utils_1 = require("./booking.utils");
// const createBookingIntoDB = async (payload: TBooking) => {
//   const result = await Booking.create(payload);
//   return result;
// };
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime, facility: facilityId, user: userId, } = payload;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found.");
    }
    const facility = yield facility_model_1.Facility.findById(facilityId);
    if (!facility) {
        throw new Error("Facility not found.");
    }
    const dateString = date.toISOString().split("T")[0];
    const startTimeFormatted = `${dateString}T${startTime}:00`;
    const endTimeFormatted = `${dateString}T${endTime}:00`;
    // Construct Date objects
    const startTimeDate = new Date(startTimeFormatted);
    const endTimeDate = new Date(endTimeFormatted);
    const pricePerHour = facility.pricePerHour;
    const payableAmount = (0, booking_utils_1.calculatePayableAmount)(startTimeDate, endTimeDate, pricePerHour);
    const transactionId = `TXN-${Date.now()}`;
    // Check for overlapping bookings
    const overlappingBooking = yield booking_model_1.Booking.findOne({
        date,
        facilityId,
        $or: [
            { startTime: { $lt: endTime, $gte: startTime } },
            { endTime: { $lte: endTime, $gt: startTime } },
        ],
    });
    if (overlappingBooking) {
        throw new Error("The facility is unavailable during the requested time slot.");
    }
    // If no overlapping booking is found, create the booking
    const result = yield booking_model_1.Booking.create(payload);
    const paymentData = {
        transactionId,
        amount: payableAmount,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address,
    };
    const paymentSession = yield (0, payment_utils_1.initialPayment)(paymentData);
    console.log(paymentSession);
    const newresult = paymentSession;
    return newresult;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate("user").populate("facility");
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, {
        new: true,
    }).populate("facility");
    return result;
});
const getBookingByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Querying directly as a string
        const booking = yield booking_model_1.Booking.findOne({ "user._id": userId })
            .populate("facility")
            .populate("user");
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    }
    catch (error) {
        console.error("Error fetching booking:", error);
        throw error;
    }
});
// const getBookingsByUser = async (userEmail: string) => {
//   try {
//     // Step 1: Query the User by email
//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const userId = user._id;
//     const userBookings = await Booking.find({ user: userId }).populate(
//       "facility"
//     );
//     return userBookings;
//   } catch (error) {
//     console.error("Error in getBookingsByUser:", error);
//     throw error;
//   }
// };
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    deleteBookingFromDB,
    getBookingByUserIdFromDB,
};
