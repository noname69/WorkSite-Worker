export type SiteStatus =
  | "PLANNED"
  | "ACTIVE"
  | "PAUSED"
  | "INACTIVE"
  | "ARCHIVED";

export type SiteResponse = {
  id: number;
  name: string;
  description: string | null;
  country: string;
  city: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  status: SiteStatus;
  managerId: number | null;
  managerFullName: string | null;
  createdAt: string;
};

export type CreateSiteRequest = {
  name: string;
  description: string | null;
  country: string;
  city: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  managerId: number | null;
};

export type UpdateSiteRequest = {
  name?: string;
  description?: string | null;
  country?: string;
  city?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  managerId?: number | null;
};

export type UpdateSiteStatusRequest = {
  status: SiteStatus;
};