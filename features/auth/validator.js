import { z } from "zod";

export const createSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be atleast 2 character")
    .max(100, "Name shouldn't exceed 100 character"),
  email: z.string().email(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(20, "Address must not exceed 20 character"),
  password: z
    .string()
    .min(8, "Message must be atleast 10yrs")
    .max(20, "Message should be less than 100yrs"),
  role: z.nativeEnum(["admin", "user"]),
});
