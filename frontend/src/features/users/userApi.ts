import api from "../../api/api";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  UserOption
} from "./userTypes";


export async function getAdminUsers() {
  const response = await api.get<UserResponse[]>("/admin/users");
  return response.data;
}

export async function getAdminUserById(id: number) {
  const response = await api.get<UserResponse>(`/admin/users/${id}`);
  return response.data;
}

export async function createAdminUser(request: CreateUserRequest) {
  const response = await api.post<UserResponse>("/admin/users", request);
  return response.data;
}

export async function updateAdminUser(id: number, request: UpdateUserRequest) {
  const response = await api.patch<UserResponse>(`/admin/users/${id}`, request);
  return response.data;
}

export async function deleteAdminUser(id: number) {
  await api.delete(`/admin/users/${id}`);
}

export async function restoreAdminUser(id: number) {
  await api.patch(`/admin/users/${id}/restore`);
}

export async function getUserOptions(role: string) {
  const response = await api.get<UserOption[]>(
    `/admin/users/options?role=${role}`,
  );

  return response.data;
}