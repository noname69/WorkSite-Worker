import { create } from "zustand";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  getUserOptions,
  restoreAdminUser,
  updateAdminUser,
} from "./userApi";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserOption,
  UserResponse,
} from "./userTypes";

type UserStore = {
  users: UserResponse[];
  managers: UserOption[];

  isLoading: boolean;
  isLoadingManagers: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  fetchManagers: () => Promise<void>;

  createUser: (request: CreateUserRequest) => Promise<void>;
  updateUser: (id: number, request: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  restoreUser: (id: number) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  managers: [],

  isLoading: false,
  isLoadingManagers: false,
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

  fetchManagers: async () => {
    try {
      set({ isLoadingManagers: true });

      const managers = await getUserOptions("MANAGER");

      set({ managers });
    } finally {
      set({ isLoadingManagers: false });
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
      users: get().users.map((user) => (user.id === id ? updatedUser : user)),
    });
  },

  deleteUser: async (id) => {
    await deleteAdminUser(id);

    await get().fetchUsers();
  },

  restoreUser: async (id) => {
    await restoreAdminUser(id);

    await get().fetchUsers();
  },
}));