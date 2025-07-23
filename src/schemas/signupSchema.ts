import { z } from "zod";
export const signUpSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "username name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Please enter a valid email address"),
});
