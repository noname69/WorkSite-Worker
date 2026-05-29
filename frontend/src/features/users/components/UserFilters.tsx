import { Plus, Search } from "lucide-react";

type UserFiltersProps = {
  search: string;
  roleFilter: string;
  statusFilter: string;
  canCreateUser: boolean;

  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onResetFilters: () => void;
  onCreateUser: () => void;
};

export default function UserFilters({
  search,
  roleFilter,
  statusFilter,
  canCreateUser,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onResetFilters,
  onCreateUser,
}: UserFiltersProps) {
  return (
    <div className="border-b border-[#e6e8ec] px-6 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="font-extrabold">User Directory</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Search, edit, activate, suspend or restore users
          </p>
        </div>

        {canCreateUser && (
          <button
            type="button"
            onClick={onCreateUser}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Plus size={16} />
            New employee
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
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <select
          className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          value={roleFilter}
          onChange={(event) => onRoleFilterChange(event.target.value)}
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
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <button
          type="button"
          onClick={onResetFilters}
          className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}