export interface User {
  _id: string;
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
  token?: string;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
}

export interface ResetPasswordResponse {
  data: string;
}

export interface VerifyResetCodeResponse {
  isVerified: boolean;
}
