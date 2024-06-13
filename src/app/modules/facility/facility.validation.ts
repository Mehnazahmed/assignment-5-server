import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Facility name is required",
      invalid_type_error: "Facility name must be a string",
    }),
    description: z.string({
      required_error: "Facility description is required",
      invalid_type_error: "Facility description must be a string",
    }),
    pricePerHour: z
      .number({
        required_error: "Price per hour is required",
        invalid_type_error: "Price per hour must be a number",
      })
      .positive({ message: "Price per hour must be a positive value" }),
    location: z.string({
      required_error: "Facility location is required",
      invalid_type_error: "Facility location must be a string",
    }),
    isDeleted: z.boolean().optional(),
  }),
});
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Facility name is required",
        invalid_type_error: "Facility name must be a string",
      })
      .optional(),
    description: z
      .string({
        required_error: "Facility description is required",
        invalid_type_error: "Facility description must be a string",
      })
      .optional(),
    pricePerHour: z
      .number({
        required_error: "Price per hour is required",
        invalid_type_error: "Price per hour must be a number",
      })
      .positive({ message: "Price per hour must be a positive value" })
      .optional(),
    location: z
      .string({
        required_error: "Facility location is required",
        invalid_type_error: "Facility location must be a string",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const facilityValidation = {
  facilityValidationSchema,
  updateFacilityValidationSchema,
};
