import { Eye, MoreHorizontal, Pencil, UserPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import IconButton from "../../../components/ui/IconButton";
import type { SiteResponse, SiteStatus } from "../siteTypes";

type SiteRowActionsProps = {
  site: SiteResponse;
  isInactive: boolean;
  onView: () => void;
  onEdit: () => void;
  onAssignWorkers: () => void;
  onUpdateStatus: (status: SiteStatus) => void;
  onDelete: () => void;
  onRestore: () => void;
};

export default function SiteRowActions({
  site,
  isInactive,
  onView,
  onEdit,
  onAssignWorkers,
  onUpdateStatus,
  onDelete,
  onRestore,
}: SiteRowActionsProps) {
  const { t } = useTranslation(["sites"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex justify-end gap-1">
      <IconButton title={t("actions.view", { ns: "sites" })} onClick={onView}>
        <Eye size={16} />
      </IconButton>

      {!isInactive && (
        <>
          <IconButton title={t("actions.edit", { ns: "sites" })} onClick={onEdit}>
            <Pencil size={16} />
          </IconButton>

          <IconButton
            title={t("actions.assignWorkers", { ns: "sites" })}
            onClick={onAssignWorkers}
          >
            <UserPlus size={16} />
          </IconButton>
        </>
      )}

      <IconButton
        title={t("actions.more", { ns: "sites" })}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <MoreHorizontal size={16} />
      </IconButton>

      {isMenuOpen && (
        <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-xl border border-[#e6e8ec] bg-white shadow-lg">
          {site.status === "PLANNED" && (
            <MenuItem onClick={() => onUpdateStatus("ACTIVE")}>
              {t("actions.activate", { ns: "sites" })}
            </MenuItem>
          )}

          {site.status === "ACTIVE" && (
            <MenuItem onClick={() => onUpdateStatus("PAUSED")}>
              {t("actions.pause", { ns: "sites" })}
            </MenuItem>
          )}

          {site.status === "PAUSED" && (
            <MenuItem onClick={() => onUpdateStatus("ACTIVE")}>
              {t("actions.resume", { ns: "sites" })}
            </MenuItem>
          )}

          {!isInactive && (
            <>
              <MenuItem onClick={() => onUpdateStatus("ARCHIVED")}>
                {t("actions.archive", { ns: "sites" })}
              </MenuItem>

              <MenuItem danger onClick={onDelete}>
                {t("actions.delete", { ns: "sites" })}
              </MenuItem>
            </>
          )}

          {isInactive && (
            <MenuItem onClick={onRestore}>
              {t("actions.restore", { ns: "sites" })}
            </MenuItem>
          )}
        </div>
      )}
    </div>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
};

function MenuItem({ children, danger = false, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-4 py-2.5 text-left text-sm font-semibold hover:bg-[#f2f4f7] ${
        danger ? "text-red-700 hover:bg-[#fff1f1]" : "text-[#1f2937]"
      }`}
    >
      {children}
    </button>
  );
}
