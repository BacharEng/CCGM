import { create } from "zustand";
import { authService } from "../services/authService";
import {
  UserState,
  User,
  ResetPasswordResponse,
  VerifyResetCodeResponse,
} from "../types/userTypes";

interface ExtendedUserState extends UserState {
  user: User | null;
  token?: string;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  createUser: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    birthDate: string
  ) => Promise<void>;
  requestResetPassword: (email: string) => Promise<ResetPasswordResponse>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  verifyResetCode: (
    email: string,
    code: string
  ) => Promise<VerifyResetCodeResponse>;
}

const useUserStore = create<ExtendedUserState>((set) => ({
  user: null,
  token: undefined,
  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);

      const user: User = {
        _id: response.user._id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        phoneNumber: response.user.phoneNumber,
        email: response.user.email,
        birthDate: response.user.birthDate,
        authenticationToken: response.user.authenticationToken,
        isAuthenticated: response.user.isAuthenticated,
        isInstructor: response.user.isInstructor,
        isAdmin: response.user.isAdmin,
        createdAt: response.user.createdAt,
      };

      set({ user, token: response.token });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  setToken: (token) => set({ token }),
  createUser: async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    birthDate: string
  ): Promise<void> => {
    try {
      await authService.createUser(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        birthDate
      );
      // Optionally, you can handle user creation success, such as setting user state or token
    } catch (error) {
      console.error("Create User failed:", error);
      throw error;
    }
  },
  requestResetPassword: async (
    email: string
  ): Promise<ResetPasswordResponse> => {
    try {
      const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
      const data = await authService.requestResetPassword(lowercaseEmail);
      return { data };
    } catch (error) {
      console.error("Request Reset Password failed:", error);
      throw error;
    }
  },
  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    try {
      const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
      await authService.resetPassword(lowercaseEmail, newPassword);
    } catch (error) {
      console.error("Reset Password failed:", error);
      throw error;
    }
  },
  verifyResetCode: async (
    email: string,
    code: string
  ): Promise<VerifyResetCodeResponse> => {
    try {
      const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
      const isVerified = await authService.verifyResetCode(
        lowercaseEmail,
        code
      );
      return { isVerified };
    } catch (error) {
      console.error("Verify Reset Code failed:", error);
      throw error;
    }
  },
}));

export default useUserStore;
