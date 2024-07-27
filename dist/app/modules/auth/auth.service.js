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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const booking_const_1 = require("../booking/booking.const");
const booking_model_1 = require("../booking/booking.model");
const userSignUpIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getUserByEmailFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    return user;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //create token and sent to the  client
    const jwtPayload = {
        userEmail: user.email,
        // userId: user._id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   config.jwt_refresh_expires_in as string
    // );
    return {
        accessToken,
        // refreshToken,
        data: {
            // _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
        },
    };
});
const checkAvailabilityFromDB = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingDate = date ? new Date(date) : new Date();
    const formattedDate = bookingDate.toISOString().split("T")[0];
    // Fetch bookings for the specified date
    const bookings = yield booking_model_1.Booking.find({
        date: new Date(formattedDate),
        isBooked: "confirmed",
    });
    // Find available slots
    const availableSlots = (0, booking_const_1.findAvailableSlots)(bookings);
    // console.log("Bookings:", bookings); // Debug: Print fetched bookings
    // console.log("Available Slots:", availableSlots); // Debug: Print available slots
    return availableSlots;
});
exports.authServices = {
    userSignUpIntoDb,
    loginUser,
    getUserByEmailFromDb,
    checkAvailabilityFromDB,
};
