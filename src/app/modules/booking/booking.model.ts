import { NextFunction } from "express";

import { model } from "mongoose";
import { TBooking } from "./booking.interface";

const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const bookingSchema = new Schema({
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
    type: Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  facility: {
    type: Types.ObjectId,
    ref: "Facility", // Reference to the Facility model
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    required: true,
    enum: ["confirmed", "unconfirmed", "canceled"],
  },
});
// Pre-save hook to calculate payable amount before saving the booking
bookingSchema.pre("save", async function (this: TBooking, next: NextFunction) {
  const booking = this as TBooking;
  const facility = await model("Facility").findById(booking.facility);
  if (!facility) {
    throw new Error("Facility not found for this booking.");
  }
  booking.payableAmount = calculatePayableAmount(
    new Date(booking.startTime),
    new Date(booking.endTime),
    facility.pricePerHour
  );
  next();
});

export const Booking = model<TBooking>("Booking", bookingSchema);
