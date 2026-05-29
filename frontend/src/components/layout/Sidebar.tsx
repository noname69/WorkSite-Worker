import { HardHat } from "lucide-react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../features/auth/authStore";
import { navItemsByRole } from "./navItems";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  const navItems = user?.role ? navItemsByRole[user.role] : [];

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
                    ? "bg-[#f2f4f7] font-semibold text-[#1f2937]"
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

      {user && (
        <div className="border-t border-[#e6e8ec] p-4">
          <div className="rounded-xl bg-[#f2f4f7] p-4">
            <p className="text-xs text-[#6b7280]">Signed in</p>
            <p className="mt-1 font-bold">{user.firstName} {user.lastName}</p>
            <p className="mt-1 text-xs text-[#6b7280]">{user.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
