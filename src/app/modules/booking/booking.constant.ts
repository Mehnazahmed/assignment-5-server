import { TUser } from "../user/user.interface";
import { TBooking } from "./booking.interface";

export const RegistrationStatus = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
} as const;

export interface TUserDocument extends Document, TUser {}
export interface TBookingDocument extends Document, TBooking {}
