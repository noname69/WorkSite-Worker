type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
};

export default function SummaryCard({
  title,
  value,
  description,
  icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#e6e8ec] bg-white p-5 shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6b7280]">{title}</p>

        <div className="text-[#6b7280]">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-3xl font-extrabold">
        {value}
      </p>

      <p className="mt-2 text-xs text-[#6b7280]">
        {description}
      </p>
    </div>
  );
}