"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const facility_model_1 = require("./facility.model");
const booking_model_1 = require("../booking/booking.model");
const facility_const_1 = require("./facility.const");
const createFacilityIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        //send image to cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.image = secure_url;
    }
    const result = yield facility_model_1.Facility.create([payload]);
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to add facility!");
    }
    return result;
});
const getAllFacilitiesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find({
        isDeleted: false,
    });
    return result;
});
const getFacilityByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findById(id);
    return result;
});
const updateFacilityFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const checkAvailabilityFromDB = (date_1, facilityId_1, ...args_1) => __awaiter(void 0, [date_1, facilityId_1, ...args_1], void 0, function* (date, facilityId, startHour = 9, endHour = 21) {
    if (!facilityId) {
        throw new Error("Facility ID is required.");
    }
    // console.log("Facility ID in query:", facilityId);
    // console.log("Query date:", new Date(date).toISOString());
    const bookingDate = date ? new Date(date) : new Date();
    const formattedDate = bookingDate.toISOString().split("T")[0];
    const queryDate = new Date(date).toISOString();
    const bookings = yield booking_model_1.Booking.find({
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
    const availableSlots = (0, facility_const_1.getAvailableSlots)(bookings, startHour, endHour);
    return {
        availableSlots: availableSlots.length > 0
            ? availableSlots
            : "No slots available for the selected date and facility.",
    };
});
exports.facilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    getAllFacilitiesFromDB,
    deleteFacilityFromDB,
    getFacilityByIdFromDB,
    checkAvailabilityFromDB,
};
