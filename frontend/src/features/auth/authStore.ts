import { create } from "zustand";
import api from "../../api/api";
import type { AuthResponse, MeResponse, UserRole } from "../../types/auth";

type AuthUser = {
  id: number;
  username: string;
  role: UserRole;
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.post<AuthResponse>("/auth/login", {
        username,
        password,
      });

      set({
        user: {
          id: response.data.userId,
          username: response.data.username,
          role: response.data.role,
        },
        isAuthenticated: true,
        isAuthChecked: true,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
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

      const response = await api.get<MeResponse>("/users/me");

      set({
        user: {
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
        },
        isAuthenticated: true,
        isAuthChecked: true,
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
    set({
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
      error: null,
    });
  },
}));