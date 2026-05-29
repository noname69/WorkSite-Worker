import {
  BarChart3,
  Building2,
  Clock3,
  FolderKanban,
  HardHat,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Users", path: "/users", icon: Users },
  { label: "Sites", path: "/sites", icon: Building2 },
  { label: "Assignments", path: "/assignments", icon: MapPin },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Time Entries", path: "/time-entries", icon: Clock3 },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-[#e6e8ec] bg-white">
      <div className="border-b border-[#e6e8ec] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-white">
            <HardHat size={20} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight">WorkSite</h1>
            <p className="text-xs text-[#6b7280]">Construction workforce</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-[#f2f4f7] text-[#1f2937] font-semibold"
                    : "text-[#6b7280] hover:bg-[#f2f4f7]"
                }`
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
