import { create } from "zustand";
import { authService } from "../services/authService";
import { UserState, User } from "../types/userTypes";

// Adjusting the UserState type to include the new user data structure
interface ExtendedUserState extends UserState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

const useUserStore = create<ExtendedUserState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      //console.log(response);

      // Adjusting to match the received user data structure
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
      //console.log(user);

      set({ user });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
}));

export default useUserStore;
