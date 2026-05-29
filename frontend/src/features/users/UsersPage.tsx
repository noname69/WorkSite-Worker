import { Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../components/ui/Badge";
import IconButton from "../../components/ui/IconButton";
import { useAuthStore } from "../auth/authStore";
import { useUserStore } from "./userStore";
import type { UserResponse, UserStatus } from "./userTypes";

import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";

import UserSummaryCards from "./components/UserSummaryCards";
import UserFilters from "./components/UserFilters";

function getInitials(user: UserResponse) {
  return `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";
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

  const canManageUsers = currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER";

  const canCreateUser = canManageUsers;

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
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const showToast = useToastStore((state) => state.showToast);
  const restoreUser = useUserStore((state) => state.restoreUser);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserResponse | null>(null);

  const handleRestoreUser = async (userId: number) => {
    try {
      await restoreUser(userId);
      showToast("User restored successfully", "success");
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  return (
    <div className="space-y-6">
      <UserSummaryCards users={users} />

      <section className="overflow-hidden rounded-2xl border border-[#e6e8ec] bg-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <UserFilters
          search={search}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          canCreateUser={canCreateUser}
          onSearchChange={setSearch}
          onRoleFilterChange={setRoleFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateUser={() => setIsCreateModalOpen(true)}
          onResetFilters={() => {
            setSearch("");
            setRoleFilter("ALL");
            setStatusFilter("ALL");
          }}
        />

        {isLoading && (
          <div className="p-6 text-sm font-semibold text-[#6b7280]">Loading users...</div>
        )}

        {error && <div className="p-6 text-sm font-semibold text-red-700">{error}</div>}

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
                {filteredUsers.map((user) => {
                  const isCurrentUser = currentUser?.id === user.id;

                  const canDeleteUser =
                    canManageUsers && user.status === "ACTIVE" && !isCurrentUser;

                  return (
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
                            <p className="text-xs text-[#6b7280]">{user.username}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge>{user.role}</Badge>
                      </td>

                      <td className="px-6 py-4">
                        <Badge tone={getStatusTone(user.status)}>{user.status}</Badge>
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

                          {canManageUsers && (
                            <IconButton
                              title="Edit user"
                              onClick={() => setEditingUser(user)}
                            >
                              <Pencil size={16} />
                            </IconButton>
                          )}

                          {user.status === "INACTIVE" && (
                            <IconButton
                              title="Restore user"
                              tone="success"
                              onClick={() => handleRestoreUser(user.id)}
                            >
                              <RotateCcw size={16} />
                            </IconButton>
                          )}

                          {canDeleteUser && (
                            <IconButton
                              title="Delete user"
                              tone="danger"
                              onClick={() => setDeletingUser(user)}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditUserModal
        isOpen={Boolean(editingUser)}
        user={editingUser}
        onClose={() => setEditingUser(null)}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deletingUser)}
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
}
