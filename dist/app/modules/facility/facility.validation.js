"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidation = void 0;
const zod_1 = require("zod");
const facilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Facility name is required",
            invalid_type_error: "Facility name must be a string",
        }),
        description: zod_1.z.string({
            required_error: "Facility description is required",
            invalid_type_error: "Facility description must be a string",
        }),
        pricePerHour: zod_1.z
            .number({
            required_error: "Price per hour is required",
            invalid_type_error: "Price per hour must be a number",
        })
            .positive({ message: "Price per hour must be a positive value" }),
        location: zod_1.z.string({
            required_error: "Facility location is required",
            invalid_type_error: "Facility location must be a string",
        }),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Facility name is required",
            invalid_type_error: "Facility name must be a string",
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Facility description is required",
            invalid_type_error: "Facility description must be a string",
        })
            .optional(),
        pricePerHour: zod_1.z
            .number({
            required_error: "Price per hour is required",
            invalid_type_error: "Price per hour must be a number",
        })
            .positive({ message: "Price per hour must be a positive value" })
            .optional(),
        location: zod_1.z
            .string({
            required_error: "Facility location is required",
            invalid_type_error: "Facility location must be a string",
        })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.facilityValidation = {
    facilityValidationSchema,
    updateFacilityValidationSchema,
};
