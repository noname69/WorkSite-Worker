import api from "../../api/api";
import type {
  CreateSiteRequest,
  SiteResponse,
  UpdateSiteRequest,
  UpdateSiteStatusRequest,
} from "./siteTypes";

export async function getSites() {
  const response = await api.get<SiteResponse[]>("/sites");

  return response.data;
}

export async function getSiteById(id: number) {
  const response = await api.get<SiteResponse>(`/sites/${id}`);

  return response.data;
}

export async function getAdminSites() {
  const response = await api.get<SiteResponse[]>("/admin/sites");

  return response.data;
}

export async function createAdminSite(request: CreateSiteRequest) {
  const response = await api.post<SiteResponse>("/admin/sites", request);

  return response.data;
}

export async function updateAdminSite(id: number, request: UpdateSiteRequest) {
  const response = await api.patch<SiteResponse>(`/admin/sites/${id}`, request);

  return response.data;
}

export async function updateAdminSiteStatus(
  id: number,
  request: UpdateSiteStatusRequest,
) {
  const response = await api.patch<SiteResponse>(
    `/admin/sites/${id}/status`,
    request,
  );

  return response.data;
}

export async function deleteAdminSite(id: number) {
  await api.delete(`/admin/sites/${id}`);
}

export async function restoreAdminSite(id: number) {
  await api.patch(`/admin/sites/${id}/restore`);
}