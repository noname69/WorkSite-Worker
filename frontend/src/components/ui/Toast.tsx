import { X } from "lucide-react";
import { useToastStore } from "../../store/toastStore";

const typeStyles = {
  success: "bg-[#eef8f2] text-green-700 border-green-100",
  error: "bg-[#fff1f1] text-red-700 border-red-100",
  info: "bg-[#f2f4f7] text-slate-700 border-slate-200",
};

export default function Toast() {
  const { message, type, hideToast } = useToastStore();

  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`flex min-w-[320px] items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${typeStyles[type]}`}
      >
        <span>{message}</span>

        <button type="button" onClick={hideToast}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}