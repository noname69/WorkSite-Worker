import { AlertTriangle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import { useSiteStore } from "./siteStore";
import type { SiteResponse } from "./siteTypes";

type ConfirmDeleteSiteModalProps = {
  isOpen: boolean;
  site: SiteResponse | null;
  onClose: () => void;
};

export default function ConfirmDeleteSiteModal({
  isOpen,
  site,
  onClose,
}: ConfirmDeleteSiteModalProps) {
  const { t } = useTranslation(["sites", "common"]);
  const deleteSite = useSiteStore((state) => state.deleteSite);
  const showToast = useToastStore((state) => state.showToast);

  if (!isOpen || !site) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteSite(site.id);

      showToast(t("messages.deleted", { ns: "sites" }), "success");
      onClose();
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#e6e8ec] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#e6e8ec] px-6 py-5">
          <div className="flex gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff1f1] text-red-700">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold">
                {t("modals.deleteTitle", { ns: "sites" })}
              </h3>
              <p className="mt-1 text-sm text-[#6b7280]">
                {t("modals.deleteDescription", { ns: "sites" })}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#6b7280] hover:bg-[#f2f4f7]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-[#6b7280]">
            {t("modals.deleteQuestion", {
              ns: "sites",
              name: site.name,
            })}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#e6e8ec] bg-[#fbfbfc] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#e6e8ec] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
          >
            {t("cancel", { ns: "common" })}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            {t("actions.delete", { ns: "sites" })}
          </button>
        </div>
      </div>
    </div>
  );
}