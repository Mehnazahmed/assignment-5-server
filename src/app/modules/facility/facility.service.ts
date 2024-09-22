import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import { Booking } from "../booking/booking.model";
import { getAvailableSlots } from "./facility.const";
import moment from "moment";

const createFacilityIntoDB = async (file: any, payload: TFacility) => {
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url as string;
  }

  const result = await Facility.create([payload]);

  if (!result.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to add facility!");
  }

  return result;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find({
    isDeleted: false,
  });
  return result;
};
const getFacilityByIdFromDB = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};

const updateFacilityFromDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

const checkAvailabilityFromDB = async (
  date: string | undefined,
  facilityId: string
) => {
  const allSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
  ];

  // Helper function to check if two time slots overlap
  const isSlotOverlapping = (bookedSlot: any, availableSlot: any) => {
    return (
      bookedSlot.startTime < availableSlot.endTime &&
      bookedSlot.endTime > availableSlot.startTime
    );
  };
  try {
    // If no date provided, use today's date
    const searchDate = date || moment().format("YYYY-MM-DD");

    // Fetch bookings for the specific facility and date
    const bookings = await Booking.find({
      facility: facilityId,
      date: searchDate,
    });

    // Filter available slots by excluding those that overlap with bookings
    const availableSlots = allSlots.filter((slot) => {
      return !bookings.some((booking) => isSlotOverlapping(booking, slot));
    });

    return availableSlots;
  } catch (error) {
    throw new Error("Error checking availability");
  }
};

export const facilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB,
  getFacilityByIdFromDB,
  checkAvailabilityFromDB,
};
