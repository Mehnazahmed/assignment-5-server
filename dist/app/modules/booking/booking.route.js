"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const booking_controller_1 = require("./booking.controller");
const express_1 = require("express");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
//create booking
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), 
// validateRequest(bookingValidation.bookingSchema),
booking_controller_1.bookingControllers.createBooking);
//get all bookngs
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getAllBookings);
// router.get("/", bookingControllers.checkAvailability);
router.get("/user", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingControllers.getUserBookings);
//cancel booking
router.delete("/:id", 
// validateRequest(bookingValidation.bookingSchema),
(0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingControllers.deleteBooking);
exports.BookingRoutes = router;
