import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
};
