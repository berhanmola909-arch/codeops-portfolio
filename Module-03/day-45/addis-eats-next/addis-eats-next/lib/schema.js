import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^(09|\+2519)\d{8}$/, "Use 09__ or +2519__"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  notes: z.string().optional(),
});