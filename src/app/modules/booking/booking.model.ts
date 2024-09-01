import mongoose, { Schema, model, Types, Document } from "mongoose";
import { TBooking } from "./booking.interface";
import { calculatePayableAmount } from "./booking.utils";
import { string } from "zod";

const bookingSchema = new Schema<TBooking>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model,
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

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
bookingSchema.pre("save", async function (this: TBooking & Document, next) {
  const booking = this as TBooking & Document;

  const facility = await model("Facility").findById(booking.facility);
  if (!facility) {
    return next(new Error("Facility not found for this booking."));
  }

  const startTime = new Date(
    `${booking.date.toISOString().split("T")[0]}T${booking.startTime}`
  );
  const endTime = new Date(
    `${booking.date.toISOString().split("T")[0]}T${booking.endTime}`
  );

  booking.payableAmount = calculatePayableAmount(
    startTime,
    endTime,
    facility.pricePerHour
  );

  next();
});
bookingSchema.index({ date: 1, facility: 1, startTime: 1, endTime: 1 });

export const Booking = model<TBooking>("Booking", bookingSchema);
