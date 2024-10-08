"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
            .max(20, { message: "Password cannot be more than 20 characters" }),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        }),
        role: zod_1.z.enum(["admin", "user", "superAdmin"], {
            required_error: "Role is required",
            invalid_type_error: "Role must be either admin or user",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
        }),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
            .max(20, { message: "Password cannot be more than 20 characters" }),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        })
            .optional(),
        role: zod_1.z
            .enum(["admin", "user", "superAdmin"], {
            required_error: "Role is required",
            invalid_type_error: "Role must be either admin or user",
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
        })
            .optional(),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    updateUserValidationSchema,
};
