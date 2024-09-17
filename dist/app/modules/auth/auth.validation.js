"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required." }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
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
exports.authValidations = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    userValidationSchema,
};
