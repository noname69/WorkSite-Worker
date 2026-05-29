import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../features/auth/authStore";
import IconButton from "../ui/IconButton";

type TopHeaderProps = {
  title: string;
  description?: string;
  onToggleSidebar?: () => void;
};

export default function TopHeader({
  title,
  description,
  onToggleSidebar,
}: TopHeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e6e8ec] bg-white px-8">
      <div className="flex items-center gap-3">
        <IconButton title="Toggle sidebar" onClick={onToggleSidebar}>
          <Menu size={16} />
        </IconButton>

        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          {description && <p className="text-xs text-[#6b7280]">{description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <IconButton title="Search">
          <Search size={16} />
        </IconButton>

        <IconButton title="Notifications">
          <Bell size={16} />
        </IconButton>

        {user && (
          <button
            type="button"
            title={`${user.username} (${user.role})`}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
          >
            {initials}
          </button>
        )}

        <IconButton title="Logout" onClick={handleLogout}>
          <LogOut size={16} />
        </IconButton>
      </div>
    </header>
  );
}
