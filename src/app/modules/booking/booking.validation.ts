import { z } from "zod";
import { RegistrationStatus } from "./booking.constant";
import { Types } from "mongoose";

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
const bookingSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM:SS format"), // Time format validation
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM:SS format"), // Time format validation
  }),
});

export const bookingValidation = {
  bookingSchema,
};
