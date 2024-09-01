import { Types } from "mongoose";
export type TBookingStatus = "confirmed" | "pending" | "canceled";
export type TPaymentStatus = "pending" | "paid" | "failed";
export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  paymentStatus: TPaymentStatus;
  isBooked: TBookingStatus;
  transactionId: string;
}
