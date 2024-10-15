import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInSchema>;

export type SignInResponse = {
  accessToken: string;
};
