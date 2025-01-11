import * as z from "zod";

export const waitlist = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const login = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be less than 30 characters",
    }),
});

export const signup = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(30, {
      message: "Name must be less than 30 characters",
    }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be less than 30 characters",
    }),
});

export const forgotSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be less than 30 characters",
    }),
});
