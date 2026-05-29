export type SiteStatus = "PLANNED" | "ACTIVE" | "PAUSED" | "INACTIVE" | "ARCHIVED";

export type SiteResponse = {
  id: number;
  name: string;
  description: string | null;
  country: string;
  city: string;
  address: string;
  status: SiteStatus;
  managerId: number;
  managerFullName: string;
  createdAt: string;
};
