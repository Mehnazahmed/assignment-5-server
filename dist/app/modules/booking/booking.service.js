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
const booking_model_1 = require("./booking.model");
// const createBookingIntoDB = async (payload: TBooking) => {
//   const result = await Booking.create(payload);
//   return result;
// };
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime, facility } = payload;
    // Check for overlapping bookings
    const overlappingBooking = yield booking_model_1.Booking.findOne({
        date,
        facility,
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
const getBookingsByUser = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    // console.log(user);
    if (!user) {
        throw new Error("User not found");
    }
    const userId = user._id;
    const userBookings = yield booking_model_1.Booking.find({ user: userId }).populate("facility");
    return userBookings;
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
// const checkAvailabilityFromDB = async (date: string) => {
//   const bookingDate = date ? new Date(date) : new Date();
//   const formattedDate = bookingDate.toISOString().split("T")[0];
//   const bookings = await Booking.find({
//     date: new Date(formattedDate),
//     isBooked: "confirmed",
//   });
//   const fullDaySlots = [{ startTime: "08:00:00", endTime: "20:00:00" }];
//   const availableSlots = findAvailableSlots(bookings, fullDaySlots);
//   return availableSlots;
// };
// Function to check availability
// const checkAvailabilityFromDB = async (date: string) => {
//   const bookingDate = date ? new Date(date) : new Date();
//   const formattedDate = bookingDate.toISOString().split("T")[0];
//   // Fetch bookings for the specified date
//   const bookings = await Booking.find({
//     date: new Date(formattedDate),
//     isBooked: "confirmed",
//   });
//   // Find available slots
//   const availableSlots = findAvailableSlots(bookings);
//   console.log("Bookings:", bookings); // Debug: Print fetched bookings
//   console.log("Available Slots:", availableSlots); // Debug: Print available slots
//   return availableSlots;
// };
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    deleteBookingFromDB,
    // checkAvailabilityFromDB,
    getBookingsByUser,
};
