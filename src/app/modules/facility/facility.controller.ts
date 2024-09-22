import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityServices } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const facilityData = req.body;
  const file = req.file;

  const result = await facilityServices.createFacilityIntoDB(
    file,
    facilityData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilityServices.updateFacilityFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility deleted successfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await facilityServices.getAllFacilitiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const getFaicilityById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const facility = await facilityServices.getFacilityByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilty retrieved successfully",
    data: facility,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  try {
    const { date, facility } = req.query;

    if (!facility) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Facility ID is required",
        data: [],
      });
    }

    // Call the service to check availability
    const availableSlots = await facilityServices.checkAvailabilityFromDB(
      date as string,
      facility as string
    );

    return res.json({
      success: true,
      statusCode: 200,
      message: "Availability checked successfully",
      data: availableSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error checking availability",
      data: [],
    });
  }
});

export const facilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
  getFaicilityById,
  checkAvailability,
};
