import type { UserRole } from "../../types/auth";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  role: UserRole;
  status: UserStatus;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  password: string;
  role: UserRole;
};

export type UpdateUserRequest = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string | null;
  role?: UserRole;
};