import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../users/userStore";
import { useEffect } from "react";

type SiteFiltersProps = {
  search: string;
  statusFilter: string;
  canCreateSite: boolean;
  managerFilter: string;

  onManagerFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onResetFilters: () => void;
  onCreateSite: () => void;
};

export default function SiteFilters({
  search,
  statusFilter,
  managerFilter,
  canCreateSite,
  onSearchChange,
  onStatusFilterChange,
  onManagerFilterChange,
  onResetFilters,
  onCreateSite,
}: SiteFiltersProps) {
  const { t } = useTranslation(["sites", "common", "siteStatus"]);

  const managers = useUserStore((state) => state.managers);
  const fetchManagers = useUserStore((state) => state.fetchManagers);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  return (
    <div className="border-b border-[#e6e8ec] px-6 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="font-extrabold">{t("filters.title", { ns: "sites" })}</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            {t("filters.description", { ns: "sites" })}
          </p>
        </div>

        {canCreateSite && (
          <button
            type="button"
            onClick={onCreateSite}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Plus size={16} />
            {t("actions.new", { ns: "sites" })}
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />

          <input
            className="w-full rounded-lg border border-[#e6e8ec] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-200 sm:w-96"
            placeholder={t("filters.searchPlaceholder", { ns: "sites" })}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <select
          className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="ALL">{t("filters.allStatuses", { ns: "sites" })}</option>
          <option value="PLANNED">{t("PLANNED", { ns: "siteStatus" })}</option>
          <option value="ACTIVE">{t("ACTIVE", { ns: "siteStatus" })}</option>
          <option value="PAUSED">{t("PAUSED", { ns: "siteStatus" })}</option>
          <option value="INACTIVE">{t("INACTIVE", { ns: "siteStatus" })}</option>
          <option value="ARCHIVED">{t("ARCHIVED", { ns: "siteStatus" })}</option>
        </select>

        <select
          className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm outline-none"
          value={managerFilter}
          onChange={(event) => onManagerFilterChange(event.target.value)}
        >
          <option value="ALL">All managers</option>

          {managers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.firstName} {manager.lastName}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onResetFilters}
          className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
        >
          {t("reset", { ns: "common" })}
        </button>
      </div>
    </div>
  );
}
