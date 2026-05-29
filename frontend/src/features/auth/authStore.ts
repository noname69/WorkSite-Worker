import { create } from "zustand";
import api from "../../api/api";
import type { AuthResponse, MeResponse, UserRole } from "../../types/auth";

type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  // status: string;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });

      // Backend validates credentials and sets HTTP-only accessToken cookie
      await api.post("/auth/login", {
        username,
        password,
      });

      // After cookie exists, load full current user profile
      await get().fetchMe();
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isAuthChecked: true,
        error: "Invalid username or password",
      });

      throw new Error("Login failed");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ isLoading: true });

      // Reads current user using cookie JWT
      const response = await api.get<MeResponse>("/users/me");

      set({
        user: {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          // status: response.data.status,
        },
        isAuthenticated: true,
        isAuthChecked: true,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isAuthChecked: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
  try {
    // Ask backend to delete HTTP-only cookie
    await api.post("/auth/logout");
  } finally {
    // Always clear frontend state, even if backend request fails
    set({
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
      error: null,
    });
  }
},
}));