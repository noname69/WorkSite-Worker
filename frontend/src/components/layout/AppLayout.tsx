import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f7f9] text-[#1f2937]">
      <Sidebar />

      <main className="flex-1">
        <TopHeader title="Dashboard" description="Overview of company work activity" />

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
