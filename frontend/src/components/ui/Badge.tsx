import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

const toneClassName = {
  default: "bg-[#e8ebf0] text-slate-700",
  success: "bg-[#eef8f2] text-slate-700",
  warning: "bg-[#fff7e8] text-slate-700",
  danger: "bg-[#fff1f1] text-slate-700",
  info: "bg-[#eef4ff] text-slate-700",
};

export default function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${toneClassName[tone]}`}
    >
      {children}
    </span>
  );
}
