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
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });

      // Backend sets JWT into HTTP-only cookie
      const response = await api.post<AuthResponse>("/auth/login", {
        username,
        password,
      });

      set({
        error: null,
        isAuthenticated: true,
        user: {
          id: response.data.userId,
          username: response.data.username,
          role: response.data.role,
        },
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
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

      // Checks if cookie JWT is still valid
      const response = await api.get<MeResponse>("/users/me");

      set({
        error: null,
        isAuthenticated: true,
        user: {
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
        },
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    // Later: call backend logout endpoint when you create it
    // await api.post("/auth/logout");

    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  isAdmin: () => {
    return get().user?.role === "ADMIN";
  },

  isManager: () => {
    const role = get().user?.role;

    return role === "ADMIN" || role === "MANAGER";
  },
}));
