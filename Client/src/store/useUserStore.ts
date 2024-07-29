import { create } from "zustand";
import { authService } from "../services/authService";
import {
  UserState,
  User,
  ResetPasswordResponse,
  VerifyResetCodeResponse,
} from "../types/userTypes";

interface ExtendedUserState extends UserState {
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
  logout: () => void;
}

const useUserStore = create<ExtendedUserState>((set) => ({
  user: JSON.parse(localStorage.getItem("userData") || "null"),
  token: localStorage.getItem("token"),

  setUser: (user) => set({ user }),

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", Date.now().toString());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
    }
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTimestamp");
    set({ user: null, token: null });
  },

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
      //console.log("User:", user);
      //console.log(response.token);
      set({ user, token: response.token });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

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
      // Optionally, handle user creation success
    } catch (error) {
      console.error("Create User failed:", error);
      throw error;
    }
  },

  requestResetPassword: async (
    email: string
  ): Promise<ResetPasswordResponse> => {
    try {
      const lowercaseEmail = email.toLowerCase();
      const data = await authService.requestResetPassword(lowercaseEmail);
      return { data };
    } catch (error) {
      console.error("Request Reset Password failed:", error);
      throw error;
    }
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    try {
      const lowercaseEmail = email.toLowerCase();
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
      const lowercaseEmail = email.toLowerCase();
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
