import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../features/auth/LoginPage";
import { useAuthStore } from "../features/auth/authStore";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f7f9]">
        <div className="rounded-2xl border border-[#e6e8ec] bg-white px-6 py-4 text-sm font-semibold text-[#6b7280]">
          Loading WorkSite...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}