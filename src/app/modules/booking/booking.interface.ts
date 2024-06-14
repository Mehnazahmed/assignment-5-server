import { Types } from "mongoose";
export type TBookingStatus = "confirmed" | "unconfirmed" | "canceled";
export interface TBooking {
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: TBookingStatus;
}
export interface TBookingData {
  date: Date;
  startTime: string;
  endTime: string;
  // user: string;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: TBookingStatus;
}
