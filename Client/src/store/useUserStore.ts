import { create } from "zustand";
import { authService } from "../services/authService";
import { UserState, User } from "../types/userTypes";

interface ExtendedUserState extends UserState {
  user: User | null;
  token?: string;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  getToken: () => string | undefined; // Adding a method to get the token
}

const useUserStore = create<ExtendedUserState>((set, get) => ({
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
  getToken: () => get().token,
}));

export default useUserStore;
