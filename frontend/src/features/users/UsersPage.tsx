import {
  CircleCheck,
  CircleSlash,
  Eye,
  HardHat,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../components/ui/Badge";
import IconButton from "../../components/ui/IconButton";
import { useAuthStore } from "../auth/authStore";
import { useUserStore } from "./userStore";
import type { UserResponse, UserStatus } from "./userTypes";

function getInitials(user: UserResponse) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}

function getStatusTone(status: UserStatus) {
  if (status === "ACTIVE") return "success";
  if (status === "SUSPENDED") return "danger";
  return "warning";
}

export default function UsersPage() {
  const currentUser = useAuthStore((state) => state.user);
  const { users, isLoading, error, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const canCreateUser = currentUser?.role === "ADMIN";

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchValue = search.toLowerCase();

      const matchesSearch =
        fullName.includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;
  const managers = users.filter((user) => user.role === "MANAGER").length;
  const suspendedUsers = users.filter(
    (user) => user.status === "SUSPENDED",
  ).length;

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard
          title="Total users"
          value={totalUsers}
          description="All registered accounts"
          icon={<Users size={20} />}
        />

        <SummaryCard
          title="Active"
          value={activeUsers}
          description="Can use the system"
          icon={<CircleCheck size={20} />}
        />

        <SummaryCard
          title="Managers"
          value={managers}
          description="Responsible for sites"
          icon={<HardHat size={20} />}
        />

        <SummaryCard
          title="Suspended"
          value={suspendedUsers}
          description="Blocked accounts"
          icon={<CircleSlash size={20} />}
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#e6e8ec] bg-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <div className="border-b border-[#e6e8ec] px-6 py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h3 className="font-extrabold">User Directory</h3>
              <p className="mt-1 text-sm text-[#6b7280]">
                Search, edit, activate, suspend or restore users
              </p>
            </div>

            {canCreateUser && (
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
                <Plus size={16} />
                New user
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />

              <input
                className="w-full rounded-lg border border-[#e6e8ec] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-200 sm:w-80"
                placeholder="Search by name, username or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="ALL">All roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="SUPPLIER">Supplier</option>
            </select>

            <select
              className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="p-6 text-sm font-semibold text-[#6b7280]">
            Loading users...
          </div>
        )}

        {error && (
          <div className="p-6 text-sm font-semibold text-red-700">{error}</div>
        )}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f2f4f7] text-[#6b7280]">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">User</th>
                  <th className="px-6 py-3 text-left font-bold">Role</th>
                  <th className="px-6 py-3 text-left font-bold">Status</th>
                  <th className="px-6 py-3 text-left font-bold">Phone</th>
                  <th className="px-6 py-3 text-left font-bold">Email</th>
                  <th className="px-6 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-[#e6e8ec] hover:bg-[#fafafa]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 font-bold text-slate-700">
                          {getInitials(user)}
                        </div>

                        <div>
                          <p className="font-bold">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Badge>{user.role}</Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge tone={getStatusTone(user.status)}>
                        {user.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-[#6b7280]">
                      {user.phoneNumber ?? "-"}
                    </td>

                    <td className="px-6 py-4 text-[#6b7280]">{user.email}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton title="View user">
                          <Eye size={16} />
                        </IconButton>

                        <IconButton title="Edit user">
                          <Pencil size={16} />
                        </IconButton>

                        {user.status === "INACTIVE" && (
                          <IconButton title="Restore user" tone="success">
                            <RotateCcw size={16} />
                          </IconButton>
                        )}

                        {user.status === "ACTIVE" && currentUser?.role === "ADMIN" && (
                          <IconButton title="Delete user" tone="danger">
                            <Trash2 size={16} />
                          </IconButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-6 text-sm font-semibold text-[#6b7280]">
                No users found.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
};

function SummaryCard({ title, value, description, icon }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#e6e8ec] bg-white p-5 shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6b7280]">{title}</p>
        <div className="text-[#6b7280]">{icon}</div>
      </div>

      <p className="mt-3 text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-xs text-[#6b7280]">{description}</p>
    </div>
  );
}