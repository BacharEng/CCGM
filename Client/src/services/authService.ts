import apiInstance from "./apiService";
import { LoginResponse } from "../types/userTypes";

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiInstance.post<LoginResponse>("/users/login", {
    email,
    password,
  });
  return response.data;
};

export const authService = {
  login,
};
