import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type APIError = {
  message: string;
  error: string;
  statusCode: number;
};
