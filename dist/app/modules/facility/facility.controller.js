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
exports.facilityControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const facility_service_1 = require("./facility.service");
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityData = req.body;
    const file = req.file;
    const result = yield facility_service_1.facilityServices.createFacilityIntoDB(file, facilityData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facility added successfully",
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.facilityServices.updateFacilityFromDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facility updated successfully",
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.facilityServices.deleteFacilityFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facility deleted successfully",
        data: result,
    });
}));
const getAllFacilities = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.facilityServices.getAllFacilitiesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result,
    });
}));
const getFaicilityById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const facility = yield facility_service_1.facilityServices.getFacilityByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facilty retrieved successfully",
        data: facility,
    });
}));
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const availableSlots = yield facility_service_1.facilityServices.checkAvailabilityFromDB(date, facility);
        return res.json({
            success: true,
            statusCode: 200,
            message: "Availability checked successfully",
            data: availableSlots,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Error checking availability",
            data: [],
        });
    }
}));
exports.facilityControllers = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacilities,
    getFaicilityById,
    checkAvailability,
};
