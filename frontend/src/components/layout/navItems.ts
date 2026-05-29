import {
  BarChart3,
  Building2,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import type { UserRole } from "../../types/auth";

export type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

export const navItemsByRole: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Users", path: "/users", icon: Users },
    { label: "Sites", path: "/sites", icon: Building2 },
    { label: "Assignments", path: "/assignments", icon: MapPin },
    { label: "Projects", path: "/projects", icon: FolderKanban },
    { label: "Time Entries", path: "/time-entries", icon: Clock3 },
    { label: "Reports", path: "/reports", icon: BarChart3 },
    { label: "Settings", path: "/settings", icon: Settings },
  ],

  MANAGER: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Sites", path: "/sites", icon: Building2 },
    { label: "Assignments", path: "/assignments", icon: MapPin },
    { label: "Projects", path: "/projects", icon: FolderKanban },
    { label: "Time Entries", path: "/time-entries", icon: Clock3 },
    { label: "Reports", path: "/reports", icon: BarChart3 },
  ],

  EMPLOYEE: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "My Assignments", path: "/my-assignments", icon: MapPin },
    { label: "Darbo apskaita", path: "/time-entries", icon: Clock3 },
    { label: "Projects", path: "/projects", icon: FolderKanban },
    { label: "My Profile", path: "/profile", icon: UserRound },
  ],

  SUPPLIER: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Orders", path: "/orders", icon: Truck },
    { label: "Inventory", path: "/inventory", icon: Package },
    { label: "My Profile", path: "/profile", icon: UserRound },
  ],
};