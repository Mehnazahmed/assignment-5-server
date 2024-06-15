"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.date(), // Required date object
        startTime: zod_1.z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM:SS format"), // Time format validation
        endTime: zod_1.z
            .string()
            .regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM:SS format"), // Time format validation
        user: zod_1.z.string().uuid(),
        facility: zod_1.z.string().uuid(),
        payableAmount: zod_1.z.number(),
        isBooked: zod_1.z.enum([
            booking_constant_1.RegistrationStatus.UPCOMING,
            booking_constant_1.RegistrationStatus.ONGOING,
            booking_constant_1.RegistrationStatus.ENDED,
        ]),
    }),
});
exports.bookingValidation = {
    bookingSchema,
};
