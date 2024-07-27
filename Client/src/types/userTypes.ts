import { ObjectId } from "bson";

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  authenticationToken: number;
  isAuthenticated: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export interface ResetPasswordResponse {
  data: string;
}

export interface VerifyResetCodeResponse {
  isVerified: boolean;
}
