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
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_utils_1 = require("./booking.utils");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model,
        required: true,
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Facility", // Reference to the Facility model
        required: true,
    },
    payableAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "pending", "failed"],
        default: "pending",
    },
    transactionId: {
        type: String,
    },
    isBooked: {
        type: String,
        required: true,
        enum: ["confirmed", "pending", "canceled"],
    },
}, {
    timestamps: true,
});
// Pre-save hook to calculate payable amount before saving the booking
// bookingSchema.pre("save", async function (this: TBooking & Document, next) {
//   const booking = this as TBooking & Document;
//   const facility = await model("Facility").findById(booking.facility);
//   if (!facility) {
//     throw new Error("Facility not found for this booking.");
//   }
//   const startTime = new Date(
//     `${booking.date.toISOString().split("T")[0]}T${booking.startTime}`
//   );
//   const endTime = new Date(
//     `${booking.date.toISOString().split("T")[0]}T${booking.endTime}`
//   );
//   booking.payableAmount = calculatePayableAmount(
//     startTime,
//     endTime,
//     facility.pricePerHour
//   );
//   next();
// });
// Pre-save hook to calculate payable amount before saving the booking
bookingSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = this;
        const facility = yield (0, mongoose_1.model)("Facility").findById(booking.facility);
        if (!facility) {
            return next(new Error("Facility not found for this booking."));
        }
        const startTime = new Date(`${booking.date.toISOString().split("T")[0]}T${booking.startTime}`);
        const endTime = new Date(`${booking.date.toISOString().split("T")[0]}T${booking.endTime}`);
        booking.payableAmount = (0, booking_utils_1.calculatePayableAmount)(startTime, endTime, facility.pricePerHour);
        next();
    });
});
bookingSchema.index({ date: 1, facility: 1, startTime: 1, endTime: 1 });
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
