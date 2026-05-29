import { Navigate } from "react-router";
import { useAuthStore } from "../features/auth/authStore";
import type { UserRole } from "../types/auth";

type RoleProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

export default function RoleProtectedRoute({
  allowedRoles,
  children,
}: RoleProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  // Wait until /users/me finished checking cookie
  if (!isAuthChecked) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f7f9]">
        <div className="rounded-2xl border border-[#e6e8ec] bg-white px-6 py-4 text-sm font-semibold text-[#6b7280]">
          Loading WorkSite...
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}