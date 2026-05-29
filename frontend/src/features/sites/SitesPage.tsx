import {
  Eye,
  PauseCircle,
  Pencil,
  PlayCircle,
  RotateCcw,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { getApiErrorMessage } from "../../api/apiError";
import Badge from "../../components/ui/Badge";
import IconButton from "../../components/ui/IconButton";
import { useToastStore } from "../../store/toastStore";
import SiteFilters from "./components/SiteFilters";
import SiteSummaryCards from "./components/SiteSummaryCards";
import { useSiteStore } from "./siteStore";
import type { SiteResponse, SiteStatus } from "./siteTypes";

import ConfirmDeleteSiteModal from "./ConfirmDeleteSiteModal";
import CreateSiteModal from "./CreateSiteModal";
import EditSiteModal from "./EditSiteModal";

function getStatusTone(status: SiteStatus) {
  if (status === "ACTIVE") return "success";
  if (status === "PLANNED") return "info";
  if (status === "PAUSED") return "warning";

  return "default";
}

function getManagerInitials(managerFullName: string | null) {
  if (!managerFullName) {
    return "NA";
  }

  const parts = managerFullName.trim().split(" ");

  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase() || "M";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("lt-LT");
}

export default function SitesPage() {
  const { t } = useTranslation(["sites", "common", "siteStatus"]);
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const { sites, isLoading, error, fetchSites, updateSiteStatus, restoreSite } =
    useSiteStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [managerFilter, setManagerFilter] = useState("ALL");

  const [editingSite, setEditingSite] = useState<SiteResponse | null>(null);
  const [deletingSite, setDeletingSite] = useState<SiteResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const canCreateSite = true;

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const filteredSites = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return sites.filter((site) => {
      const matchesSearch =
        searchValue === "" ||
        site.name.toLowerCase().includes(searchValue) ||
        (site.description ?? "").toLowerCase().includes(searchValue) ||
        site.country.toLowerCase().includes(searchValue) ||
        site.city.toLowerCase().includes(searchValue) ||
        site.address.toLowerCase().includes(searchValue) ||
        (site.managerFullName ?? "").toLowerCase().includes(searchValue);

      const matchesStatus = statusFilter === "ALL" || site.status === statusFilter;

      const matchesManager =
        managerFilter === "ALL" || String(site.managerId) === managerFilter;

      return matchesSearch && matchesStatus && matchesManager;
    });
  }, [sites, search, statusFilter, managerFilter]);

  const handleUpdateStatus = async (siteId: number, status: SiteStatus) => {
    try {
      await updateSiteStatus(siteId, { status });

      showToast(t("messages.statusUpdated", { ns: "sites" }), "success");
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  const handleRestoreSite = async (siteId: number) => {
    try {
      await restoreSite(siteId);

      showToast(t("messages.restored", { ns: "sites" }), "success");
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  return (
    <div className="space-y-6">
      <SiteSummaryCards sites={sites} />

      <section className="overflow-hidden rounded-2xl border border-[#e6e8ec] bg-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <SiteFilters
          search={search}
          statusFilter={statusFilter}
          managerFilter={managerFilter}
          canCreateSite={canCreateSite}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
          onManagerFilterChange={setManagerFilter}
          onCreateSite={() => setIsCreateModalOpen(true)}
          onResetFilters={() => {
            setSearch("");
            setStatusFilter("ALL");
            setManagerFilter("ALL");
          }}
        />

        {isLoading && (
          <div className="p-6 text-sm font-semibold text-[#6b7280]">
            {t("loading", { ns: "sites" })}
          </div>
        )}

        {error && <div className="p-6 text-sm font-semibold text-red-700">{error}</div>}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f2f4f7] text-[#6b7280]">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">
                    {t("table.site", { ns: "sites" })}
                  </th>
                  <th className="px-6 py-3 text-left font-bold">
                    {t("table.location", { ns: "sites" })}
                  </th>
                  <th className="px-6 py-3 text-left font-bold">
                    {t("table.manager", { ns: "sites" })}
                  </th>
                  <th className="px-6 py-3 text-left font-bold">
                    {t("table.status", { ns: "sites" })}
                  </th>
                  <th className="px-6 py-3 text-left font-bold">
                    {t("table.created", { ns: "sites" })}
                  </th>
                  <th className="px-6 py-3 text-right font-bold">
                    {t("actions", { ns: "common" })}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredSites.map((site) => {
                  const isInactive =
                    site.status === "INACTIVE" || site.status === "ARCHIVED";

                  const canDeleteSite =
                    site.status === "ACTIVE" ||
                    site.status === "PLANNED" ||
                    site.status === "PAUSED";

                  return (
                    <tr
                      key={site.id}
                      className={`border-t border-[#e6e8ec] hover:bg-[#fafafa] ${
                        isInactive ? "bg-[#fafafa] opacity-70" : ""
                      }`}
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold">{site.name}</p>

                        <p className="mt-1 max-w-md text-xs text-[#6b7280]">
                          {site.description || t("noDescription", { ns: "sites" })}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p>{site.city}</p>

                        <p className="mt-1 text-xs text-[#6b7280]">{site.address}</p>
                      </td>

                      <td className="px-6 py-5">
                        {site.managerFullName ? (
                          <div className="flex items-center gap-2">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                              {getManagerInitials(site.managerFullName)}
                            </div>

                            <span>{site.managerFullName}</span>
                          </div>
                        ) : (
                          <span className="text-[#6b7280]">
                            {t("noManager", { ns: "sites" })}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <Badge tone={getStatusTone(site.status)}>
                          {t(site.status, { ns: "siteStatus" })}
                        </Badge>
                      </td>

                      <td className="px-6 py-5 text-[#6b7280]">
                        {formatDate(site.createdAt)}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-1">
                          <IconButton
                            title={t("actions.view", { ns: "sites" })}
                            onClick={() => navigate(`/sites/${site.id}`)}
                          >
                            <Eye size={16} />
                          </IconButton>

                          {!isInactive && (
                            <IconButton
                              title={t("actions.edit", { ns: "sites" })}
                              onClick={() => setEditingSite(site)}
                            >
                              <Pencil size={16} />
                            </IconButton>
                          )}

                          {!isInactive && (
                            <IconButton
                              title={t("actions.assignWorkers", {
                                ns: "sites",
                              })}
                              onClick={() => navigate(`/sites/${site.id}/assignments`)}
                            >
                              <UserPlus size={16} />
                            </IconButton>
                          )}

                          {site.status === "ACTIVE" && (
                            <IconButton
                              title={t("actions.pause", { ns: "sites" })}
                              onClick={() => handleUpdateStatus(site.id, "PAUSED")}
                            >
                              <PauseCircle size={16} />
                            </IconButton>
                          )}

                          {site.status === "PLANNED" && (
                            <IconButton
                              title={t("actions.activate", { ns: "sites" })}
                              tone="success"
                              onClick={() => handleUpdateStatus(site.id, "ACTIVE")}
                            >
                              <PlayCircle size={16} />
                            </IconButton>
                          )}

                          {site.status === "PAUSED" && (
                            <IconButton
                              title={t("actions.resume", { ns: "sites" })}
                              tone="success"
                              onClick={() => handleUpdateStatus(site.id, "ACTIVE")}
                            >
                              <PlayCircle size={16} />
                            </IconButton>
                          )}

                          {canDeleteSite && (
                            <IconButton
                              title={t("actions.delete", { ns: "sites" })}
                              tone="danger"
                              onClick={() => setDeletingSite(site)}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          )}

                          {isInactive && (
                            <IconButton
                              title={t("actions.restore", { ns: "sites" })}
                              tone="success"
                              onClick={() => handleRestoreSite(site.id)}
                            >
                              <RotateCcw size={16} />
                            </IconButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredSites.length === 0 && (
              <div className="p-6 text-sm font-semibold text-[#6b7280]">
                {t("noSitesFound", { ns: "sites" })}
              </div>
            )}
          </div>
        )}
      </section>

      <CreateSiteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditSiteModal
        isOpen={Boolean(editingSite)}
        site={editingSite}
        onClose={() => setEditingSite(null)}
      />

      <ConfirmDeleteSiteModal
        isOpen={Boolean(deletingSite)}
        site={deletingSite}
        onClose={() => setDeletingSite(null)}
      />
    </div>
  );
}
