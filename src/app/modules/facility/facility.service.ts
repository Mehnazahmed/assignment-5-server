import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import { Booking } from "../booking/booking.model";
import { getAvailableSlots } from "./facility.const";

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
  date: string,
  facilityId: string,
  startHour: number = 9,
  endHour: number = 21
): Promise<any> => {
  if (!facilityId) {
    throw new Error("Facility ID is required.");
  }
  // console.log("Facility ID in query:", facilityId);
  // console.log("Query date:", new Date(date).toISOString());

  const bookingDate = date ? new Date(date) : new Date();
  const formattedDate = bookingDate.toISOString().split("T")[0];
  const queryDate = new Date(date).toISOString();

  const bookings = await Booking.find({
    facility: facilityId,
    date: queryDate,
    isBooked: "confirmed",
  });

  // Fetch bookings for the specified date
  // const bookings = await Booking.find({
  //   date: {
  //     $gte: new Date(`${formattedDate}T00:00:00.000Z`),
  //     $lt: new Date(`${formattedDate}T23:59:59.999Z`),
  //   },
  //   facility: facilityId,
  //   isBooked: "confirmed",
  // });

  // Find available slots
  const availableSlots = getAvailableSlots(bookings, startHour, endHour);

  return {
    availableSlots:
      availableSlots.length > 0
        ? availableSlots
        : "No slots available for the selected date and facility.",
  };
};
export const facilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB,
  getFacilityByIdFromDB,
  checkAvailabilityFromDB,
};
