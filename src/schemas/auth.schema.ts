import * as z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string("First name is required")
      .min(1, "First name is required"),
    lastName: z.string("Last name is required").min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    phoneNumber: z
      .string("Phone number is required")
      .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string("password is required")
      .min(1, "password cannot be empty"),
  })
  .strict();

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
