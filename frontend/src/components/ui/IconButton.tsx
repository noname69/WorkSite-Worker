import type { ReactNode } from "react";

type IconButtonProps = {
  title: string;
  children: ReactNode;
  onClick?: () => void;
  tone?: "default" | "danger" | "success";
};

const toneClassName = {
  default: "hover:bg-[#f2f4f7] hover:text-[#1f2937]",
  danger: "hover:bg-[#fff1f1] hover:text-red-700",
  success: "hover:bg-[#eef8f2] hover:text-green-700",
};

export default function IconButton({
  title,
  children,
  onClick,
  tone = "default",
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`grid h-[34px] w-[34px] place-items-center rounded-[10px] text-[#6b7280] transition ${toneClassName[tone]}`}
    >
      {children}
    </button>
  );
}
