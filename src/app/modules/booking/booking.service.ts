import { User } from "../user/user.model";
import { findAvailableSlots } from "./booking.const";
import { TBookingDocument, TUserDocument } from "./booking.constant";
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
  ).populate("facility");
  return result;
};

// const getBookingsByUser = async (userEmail: any) => {
//   const user = await User.find({ email: userEmail });
//   console.log(user);
//   const userId = user._id;
//   const userBookings = await Booking.findOne({ user: userId }).populate(
//     "facility"
//   );
//   return userBookings;
// };

const getBookingsByUser = async (userEmail: string) => {
  try {
    // Step 1: Query the User by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const userBookings = await Booking.find({ user: userId }).populate(
      "facility"
    );

    return userBookings;
  } catch (error) {
    console.error("Error in getBookingsByUser:", error);
    throw error; // Rethrow the error to handle it upstream
  }
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
