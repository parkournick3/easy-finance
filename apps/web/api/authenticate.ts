import { SignInInput, SignInResponse } from "@repo/validations-and-types";
import { api } from "./api";

export const signIn = async (data: SignInInput) => {
  const response = await api.post<SignInResponse>("/sessions", data);

  return response;
};
