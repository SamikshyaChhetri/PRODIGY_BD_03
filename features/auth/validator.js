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
    .min(8, "password must be of atleast 8 character ")
    .max(20, "password should be less than 20 character"),
  role: z.nativeEnum(["admin", "user"]),
});
