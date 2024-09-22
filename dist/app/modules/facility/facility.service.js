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
const moment_1 = __importDefault(require("moment"));
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
//check availability
const checkAvailabilityFromDB = (date, facilityId) => __awaiter(void 0, void 0, void 0, function* () {
    const allSlots = [
        { startTime: "08:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "14:00" },
        { startTime: "14:00", endTime: "16:00" },
        { startTime: "16:00", endTime: "18:00" },
    ];
    // Helper function to check if two time slots overlap
    const isSlotOverlapping = (bookedSlot, availableSlot) => {
        return (bookedSlot.startTime < availableSlot.endTime &&
            bookedSlot.endTime > availableSlot.startTime);
    };
    try {
        // If no date provided, use today's date
        const searchDate = date || (0, moment_1.default)().format("YYYY-MM-DD");
        // Fetch bookings for the specific facility and date
        const bookings = yield booking_model_1.Booking.find({
            facility: facilityId,
            date: searchDate,
        });
        // Filter available slots by excluding those that overlap with bookings
        const availableSlots = allSlots.filter((slot) => {
            return !bookings.some((booking) => isSlotOverlapping(booking, slot));
        });
        return availableSlots;
    }
    catch (error) {
        throw new Error("Error checking availability");
    }
});
exports.facilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    getAllFacilitiesFromDB,
    deleteFacilityFromDB,
    getFacilityByIdFromDB,
    checkAvailabilityFromDB,
};
