import { create } from "zustand";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  restoreAdminUser,
  updateAdminUser,
} from "./userApi";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "./userTypes";

type UserStore = {
  users: UserResponse[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  createUser: (request: CreateUserRequest) => Promise<void>;
  updateUser: (id: number, request: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  restoreUser: (id: number) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });

      const users = await getAdminUsers();

      set({ users });
    } catch {
      set({ error: "Failed to load users" });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (request) => {
    const createdUser = await createAdminUser(request);

    set({
      users: [createdUser, ...get().users],
    });
  },

  updateUser: async (id, request) => {
    const updatedUser = await updateAdminUser(id, request);

    set({
      users: get().users.map((user) =>
        user.id === id ? updatedUser : user,
      ),
    });
  },

  deleteUser: async (id) => {
    await deleteAdminUser(id);

    set({
      users: get().users.map((user) =>
        user.id === id ? { ...user, status: "INACTIVE" } : user,
      ),
    });
  },

  restoreUser: async (id) => {
    const restoredUser = await restoreAdminUser(id);

    set({
      users: get().users.map((user) =>
        user.id === id ? restoredUser : user,
      ),
    });
  },
}));