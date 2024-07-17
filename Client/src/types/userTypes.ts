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
  token: string; // Assuming the token is still needed and part of the response
}

export interface UserState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}
