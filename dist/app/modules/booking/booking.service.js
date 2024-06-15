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
const user_model_1 = require("../user/user.model");
const booking_const_1 = require("./booking.const");
const booking_model_1 = require("./booking.model");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.create(payload);
    return result;
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
// const getBookingsByUser = async (userEmail: any) => {
//   const user = await User.find({ email: userEmail });
//   console.log(user);
//   const userId = user._id;
//   const userBookings = await Booking.findOne({ user: userId }).populate(
//     "facility"
//   );
//   return userBookings;
// };
const getBookingsByUser = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Query the User by email
        const user = yield user_model_1.User.findOne({ email: userEmail });
        if (!user) {
            throw new Error("User not found");
        }
        const userId = user._id;
        const userBookings = yield booking_model_1.Booking.find({ user: userId }).populate("facility");
        return userBookings;
    }
    catch (error) {
        console.error("Error in getBookingsByUser:", error);
        throw error; // Rethrow the error to handle it upstream
    }
});
const checkAvailabilityFromDb = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingDate = date ? new Date(date) : new Date();
    const formattedDate = bookingDate.toISOString().split("T")[0];
    const bookings = yield booking_model_1.Booking.find({
        date: new Date(formattedDate),
        isBooked: "confirmed",
    });
    const fullDaySlots = [{ startTime: "08:00:00", endTime: "20:00:00" }];
    const availableSlots = (0, booking_const_1.findAvailableSlots)(bookings, fullDaySlots);
    return availableSlots;
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    deleteBookingFromDB,
    checkAvailabilityFromDb,
    getBookingsByUser,
};
