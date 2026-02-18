import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri"),
  password: z.string().min(6, "Parol kamida 6 belgidan iborat bo'lsin"),
  remember: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "To'liq ism kiriting"),
    email: z.string().email("Email noto'g'ri"),
    password: z
      .string()
      .min(8, "Parol kamida 8 belgi")
      .regex(/[A-Z]/, "Kamida 1 ta katta harf")
      .regex(/[0-9]/, "Kamida 1 ta raqam")
      .regex(/[^A-Za-z0-9]/, "Kamida 1 ta maxsus belgi"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
  });

export const forgotSchema = z.object({
  email: z.string().email("Email noto'g'ri"),
});

export const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Parol kamida 8 belgi")
      .regex(/[A-Z]/, "Kamida 1 ta katta harf")
      .regex(/[0-9]/, "Kamida 1 ta raqam")
      .regex(/[^A-Za-z0-9]/, "Kamida 1 ta maxsus belgi"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
  });
