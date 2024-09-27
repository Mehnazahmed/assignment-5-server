import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .max(20, { message: "Password cannot be more than 20 characters" }),

    phone: z.string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    }),
    role: z.enum(["admin", "user", "superAdmin"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be either admin or user",
    }),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .max(20, { message: "Password cannot be more than 20 characters" }),
    phone: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .optional(),
    role: z
      .enum(["admin", "user", "superAdmin"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either admin or user",
      })
      .optional(),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,

  updateUserValidationSchema,
};
