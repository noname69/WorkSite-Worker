import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import AppLayout from "../components/layout/AppLayout";
import Toast from "../components/ui/Toast";

import LoginPage from "../features/auth/LoginPage";
import { useAuthStore } from "../features/auth/authStore";

import DashboardPage from "../features/dashboard/DashboardPage";
import SitesPage from "../features/sites/SitesPage";
import UsersPage from "../features/users/UsersPage";
import SiteAssignmentsPage from "../features/site-assignments/SiteAssignmentsPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import RoleProtectedRoute from "../routes/RoleProtectedRoute";

function AppRoutes() {
  const location = useLocation();
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);


 useEffect(() => {
  if (location.pathname === "/login") {
    return;
  }

  if (!isAuthChecked) {
    fetchMe();
  }
}, [fetchMe, isAuthChecked, location.pathname]);

  return (
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

        <Route
          path="/users"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <UsersPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/sites"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
              <SitesPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <SiteAssignmentsPage />
            </RoleProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <Toast />
    </>
  );
}

// export default function App() {
//   const fetchMe = useAuthStore((state) => state.fetchMe);
//   const isLoading = useAuthStore((state) => state.isLoading);

//   useEffect(() => {
//     fetchMe();
//   }, [fetchMe]);

//   if (isLoading) {
//     return (
//       <div className="grid min-h-screen place-items-center bg-[#f6f7f9]">
//         <div className="rounded-2xl border border-[#e6e8ec] bg-white px-6 py-4 text-sm font-semibold text-[#6b7280]">
//           Loading WorkSite...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />

//           <Route
//             element={
//               <ProtectedRoute>
//                 <AppLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<DashboardPage />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//       <Toast />
//     </>
//   );
// }
