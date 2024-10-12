import { z } from "zod";

import { User } from "@repo/db";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  currency: z.string().min(3).max(3),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type CreateUserResponse = Omit<User, "password">;
