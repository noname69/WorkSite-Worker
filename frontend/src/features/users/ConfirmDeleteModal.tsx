import { AlertTriangle, X } from "lucide-react";
import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import { useUserStore } from "./userStore";
import type { UserResponse } from "./userTypes";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  user: UserResponse | null;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  isOpen,
  user,
  onClose,
}: ConfirmDeleteModalProps) {
  const deleteUser = useUserStore((state) => state.deleteUser);
  const showToast = useToastStore((state) => state.showToast);

  if (!isOpen || !user) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);

      showToast("User deactivated successfully", "success");
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
              <h3 className="text-lg font-extrabold">Deactivate user?</h3>
              <p className="mt-1 text-sm text-[#6b7280]">
                This will deactivate the selected user account.
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
            Are you sure you want to deactivate{" "}
            <span className="font-bold text-[#1f2937]">
              {user.firstName} {user.lastName}
            </span>
            ?
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#e6e8ec] bg-[#fbfbfc] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#e6e8ec] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}