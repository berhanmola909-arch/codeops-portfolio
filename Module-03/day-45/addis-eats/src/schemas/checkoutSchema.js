import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^(09|\+2519)\d{8}$/, "Enter a valid Ethiopian phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  notes: z.string().optional(),
});