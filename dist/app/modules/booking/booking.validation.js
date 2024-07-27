"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
// const bookingSchema = z.object({
//   body: z.object({
//     date: z.date(), // Required date object
//     startTime: z
//       .string()
//       .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM:SS format"), // Time format validation
//     endTime: z
//       .string()
//       .regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM:SS format"), // Time format validation
//     user: z.string().uuid(),
//     facility: z.string().uuid(),
//     payableAmount: z.number(),
//     isBooked: z.enum([
//       RegistrationStatus.UPCOMING,
//       RegistrationStatus.ONGOING,
//       RegistrationStatus.ENDED,
//     ]),
//   }),
// });
const bookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        startTime: zod_1.z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM:SS format"), // Time format validation
        endTime: zod_1.z
            .string()
            .regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM:SS format"), // Time format validation
    }),
});
exports.bookingValidation = {
    bookingSchema,
};
