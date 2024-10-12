import {
  CreateUserInput,
  CreateUserResponse,
} from "@repo/validations-and-types";
import { api } from "./api";

export const createUser = async (data: CreateUserInput) => {
  const response = await api.post<CreateUserResponse>("/users", data);

  return response;
};
