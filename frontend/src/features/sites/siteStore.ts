import { create } from "zustand";
import {
  createAdminSite,
  deleteAdminSite,
  getAdminSites,
  restoreAdminSite,
  updateAdminSite,
  updateAdminSiteStatus,
} from "./siteApi";
import type {
  CreateSiteRequest,
  SiteResponse,
  UpdateSiteRequest,
  UpdateSiteStatusRequest,
} from "./siteTypes";

type SiteStore = {
  sites: SiteResponse[];
  isLoading: boolean;
  error: string | null;

  fetchSites: () => Promise<void>;
  createSite: (request: CreateSiteRequest) => Promise<void>;
  updateSite: (id: number, request: UpdateSiteRequest) => Promise<void>;
  updateSiteStatus: (
    id: number,
    request: UpdateSiteStatusRequest,
  ) => Promise<void>;
  deleteSite: (id: number) => Promise<void>;
  restoreSite: (id: number) => Promise<void>;
};

export const useSiteStore = create<SiteStore>((set, get) => ({
  sites: [],
  isLoading: false,
  error: null,

  fetchSites: async () => {
    try {
      set({ isLoading: true, error: null });

      const sites = await getAdminSites();

      set({ sites });
    } catch {
      set({ error: "Failed to load sites" });
    } finally {
      set({ isLoading: false });
    }
  },

  createSite: async (request) => {
    const createdSite = await createAdminSite(request);

    set({
      sites: [createdSite, ...get().sites],
    });
  },

  updateSite: async (id, request) => {
    const updatedSite = await updateAdminSite(id, request);

    set({
      sites: get().sites.map((site) =>
        site.id === id ? updatedSite : site,
      ),
    });
  },

  updateSiteStatus: async (id, request) => {
    const updatedSite = await updateAdminSiteStatus(id, request);

    set({
      sites: get().sites.map((site) =>
        site.id === id ? updatedSite : site,
      ),
    });
  },

  deleteSite: async (id) => {
    await deleteAdminSite(id);

    await get().fetchSites();
  },

  restoreSite: async (id) => {
    await restoreAdminSite(id);

    await get().fetchSites();
  },
}));