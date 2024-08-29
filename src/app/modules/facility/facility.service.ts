import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

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

export const facilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB,
  getFacilityByIdFromDB,
};
