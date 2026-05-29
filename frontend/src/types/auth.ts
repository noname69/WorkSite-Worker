export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE" | "SUPPLIER";

export type MeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRole;
  status: string;
};

export type AuthResponse = {
  message: string;
  userId: number;
  username: string;
  role: UserRole;
};
