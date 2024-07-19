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

const createUser = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string,
  birthDate: string
): Promise<void> => {
  const [day, month, year] = birthDate
    .split("/")
    .map((part) => parseInt(part, 10));
  const birthDateObject = new Date(year, month - 1, day);

  //console.log(birthDateObject);
  await apiInstance.post("/users/newUser", {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    birthDate: birthDateObject,
  });
};

const requestResetPassword = async (email: string): Promise<string> => {
  const response = await apiInstance.post<{ code: string }>(
    "/users/requestPasswordReset",
    {
      email,
    }
  );
  return response.data.code;
};

const resetPassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  await apiInstance.post("/users/resetPassword", {
    email,
    newPassword,
  });
};

const verifyResetCode = async (
  email: string,
  code: string
): Promise<boolean> => {
  const response = await apiInstance.post<{ isVerified: boolean }>(
    "/users/verifyResetCode",
    {
      email,
      code,
    }
  );
  return response.data.isVerified;
};

export const authService = {
  login,
  createUser,
  requestResetPassword,
  resetPassword,
  verifyResetCode,
};
