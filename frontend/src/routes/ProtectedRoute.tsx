import { Navigate } from "react-router";
import { useAuthStore } from "../features/auth/authStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  if (!isAuthChecked) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f7f9]">
        <div className="rounded-2xl border border-[#e6e8ec] bg-white px-6 py-4 text-sm font-semibold text-[#6b7280]">
          Loading WorkSite...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
