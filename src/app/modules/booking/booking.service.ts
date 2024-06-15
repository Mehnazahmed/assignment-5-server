import { findAvailableSlots } from "./booking.const";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    {
      new: true,
    }
  ).populate("Facility");
  return result;
};

const getBookingsByUser = async (id: string) => {
  const result = await Booking.findById(id).populate("Facility");
  return result;
};

const checkAvailabilityFromDb = async (date: string) => {
  const bookingDate = date ? new Date(date) : new Date();

  const formattedDate = bookingDate.toISOString().split("T")[0];

  const bookings = await Booking.find({
    date: new Date(formattedDate),
    isBooked: "confirmed",
  });

  const fullDaySlots = [{ startTime: "08:00:00", endTime: "20:00:00" }];

  const availableSlots = findAvailableSlots(bookings, fullDaySlots);

  return availableSlots;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  deleteBookingFromDB,
  checkAvailabilityFromDb,
  getBookingsByUser,
};
