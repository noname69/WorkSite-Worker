import { Bell, Download, Plus, Search } from "lucide-react";
import IconButton from "../ui/IconButton";

type TopHeaderProps = {
  title: string;
  description?: string;
};

export default function TopHeader({ title, description }: TopHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e6e8ec] bg-white px-8">
      <div className="flex items-center gap-8">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          {description && <p className="text-xs text-[#6b7280]">{description}</p>}
        </div>

        <nav className="hidden items-center gap-2 xl:flex">
          <a className="rounded-lg bg-[#f2f4f7] px-3 py-2 text-sm font-semibold" href="#">
            Overview
          </a>
          <a
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6b7280] hover:bg-[#f2f4f7]"
            href="#"
          >
            Today
          </a>
          <a
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6b7280] hover:bg-[#f2f4f7]"
            href="#"
          >
            Month
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <IconButton title="Search">
          <Search size={16} />
        </IconButton>

        <IconButton title="Notifications">
          <Bell size={16} />
        </IconButton>

        <button className="inline-flex items-center gap-2 rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f2f4f7]">
          <Download size={16} />
          Export
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          <Plus size={16} />
          Quick add
        </button>
      </div>
    </header>
  );
}
