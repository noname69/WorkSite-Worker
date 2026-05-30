import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import { useSiteStore } from "./siteStore";
import type { CreateSiteRequest } from "./siteTypes";

import ManagerSelect from "../../components/forms/ManagerSelect";

type CreateSiteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CreateSiteForm = {
  name: string;
  description: string;
  country: string;
  city: string;
  address: string;
  managerId: string;
};

export default function CreateSiteModal({ isOpen, onClose }: CreateSiteModalProps) {
  const { t } = useTranslation(["sites", "common"]);
  const createSite = useSiteStore((state) => state.createSite);
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSiteForm>({
    defaultValues: {
      name: "",
      description: "",
      country: "Lithuania",
      city: "",
      address: "",
      managerId: "",
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateSiteForm) => {
    try {
      const request: CreateSiteRequest = {
        name: data.name,
        description: data.description || null,
        country: data.country,
        city: data.city,
        address: data.address,
        latitude: null,
        longitude: null,
        managerId: data.managerId ? Number(data.managerId) : null,
      };

      await createSite(request);

      showToast(t("messages.created", { ns: "sites" }), "success");
      handleClose();
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#e6e8ec] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#e6e8ec] px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold">
              {t("modals.createTitle", { ns: "sites" })}
            </h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              {t("modals.createDescription", { ns: "sites" })}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#6b7280] hover:bg-[#f2f4f7]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="text-sm font-semibold">
                {t("form.name", { ns: "sites" })}
              </span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("name", {
                  required: t("validation.nameRequired", { ns: "sites" }),
                  minLength: {
                    value: 2,
                    message: t("validation.nameMin", { ns: "sites" }),
                  },
                  maxLength: {
                    value: 100,
                    message: t("validation.nameMax", { ns: "sites" }),
                  },
                })}
              />

              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.name.message}
                </p>
              )}
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold">
                {t("form.description", { ns: "sites" })}
              </span>

              <textarea
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("description")}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                {t("form.country", { ns: "sites" })}
              </span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("country", {
                  required: t("validation.countryRequired", { ns: "sites" }),
                })}
              />

              {errors.country && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.country.message}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                {t("form.city", { ns: "sites" })}
              </span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("city", {
                  required: t("validation.cityRequired", { ns: "sites" }),
                })}
              />

              {errors.city && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.city.message}
                </p>
              )}
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold">
                {t("form.address", { ns: "sites" })}
              </span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("address", {
                  required: t("validation.addressRequired", { ns: "sites" }),
                })}
              />

              {errors.address && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.address.message}
                </p>
              )}
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold">
                {t("form.manager", { ns: "sites" })}
              </span>

              <ManagerSelect
                value={watch("managerId")}
                onChange={(value) => setValue("managerId", value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#e6e8ec] bg-[#fbfbfc] px-6 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-[#e6e8ec] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
            >
              {t("cancel", { ns: "common" })}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
            >
              {isSubmitting
                ? t("creating", { ns: "common" })
                : t("actions.create", { ns: "sites" })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
