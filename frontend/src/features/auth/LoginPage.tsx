import {
  ArrowRight,
  Eye,
  HardHat,
  Info,
  LockKeyhole,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "./authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await login(username, password);
    navigate("/");
  };

  return (
    <section className="grid min-h-screen grid-cols-1 bg-[#f6f7f9] xl:grid-cols-2">
      {/* LEFT BRAND SIDE */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white xl:flex">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-800">
              <HardHat className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold">WorkSite</h1>
              <p className="text-sm text-white/60">
                Construction workforce platform
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-xl">
            <p className="text-sm font-semibold text-white/60">
              WORKFORCE · SITES · TIME
            </p>

            <h2 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight">
              Manage workers, sites and time entries in one clean system.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Plan site assignments, track monthly hours, manage projects and
              keep construction teams organized.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-extrabold">34</p>
            <p className="mt-1 text-sm text-white/60">Active workers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-extrabold">8</p>
            <p className="mt-1 text-sm text-white/60">Active sites</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-extrabold">152h</p>
            <p className="mt-1 text-sm text-white/60">This month</p>
          </div>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="flex items-center justify-center p-6 xl:p-12">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <div className="mb-8 flex items-center gap-3 xl:hidden">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-800 text-white">
              <HardHat className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold">WorkSite</h1>
              <p className="text-sm text-[#6b7280]">
                Construction workforce platform
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e6e8ec] bg-white p-8 shadow-[0_16px_40px_rgba(31,41,55,0.08)]">
            <div className="mb-8 flex justify-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-800 text-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
                <HardHat className="h-8 w-8" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-extrabold">Welcome back</h2>
              <p className="mt-2 text-sm text-[#6b7280]">
                Login to access your WorkSite account
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl bg-[#fff1f1] p-4 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="text-sm font-semibold">Username</span>

                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />

                  <input
                    className="w-full rounded-xl border border-[#e6e8ec] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                    placeholder="john.smith"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Password</span>

                <div className="relative mt-2">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />

                  <input
                    className="w-full rounded-xl border border-[#e6e8ec] bg-white py-3 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
                </div>
              </label>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6b7280]">
                  <input type="checkbox" className="accent-slate-800" />
                  Remember me
                </label>

                <a
                  href="#"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-3 font-bold text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Login"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-[#f2f4f7] p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-[#6b7280]" />

                <p className="text-xs leading-5 text-[#6b7280]">
                  Authentication uses HTTP-only cookies from the Spring Boot
                  backend.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#6b7280]">
            © 2026 WorkSite. Internal company workforce system.
          </p>
        </div>
      </div>
    </section>
  );
}