import { z } from "zod";
import { RegistrationStatus } from "./booking.constant";

const bookingSchema = z.object({
  date: z.date(), // Required date object
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, "Start time must be in HH:MM:SS format"), // Time format validation
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, "End time must be in HH:MM:SS format"), // Time format validation

  user: z.string().uuid(), // Reference to User ID (adjust based on your user model)
  facility: z.string().uuid(), // Reference to Facility ID (adjust based on your user model)
  payableAmount: z.number(),

  isBooked: z.enum([
    RegistrationStatus.UPCOMING,
    RegistrationStatus.ONGOING,
    RegistrationStatus.ENDED,
  ]),
});

export const BookingValidation = {
  bookingSchema,
};
