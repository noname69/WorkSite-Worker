import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f7f9] text-[#1f2937]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          />

          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Page content */}
      <main className="min-w-0 flex-1">
        <TopHeader
          title="Dashboard"
          description="Overview of your WorkSite workspace"
          onToggleSidebar={() => setIsSidebarOpen((value) => !value)}
        />

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}