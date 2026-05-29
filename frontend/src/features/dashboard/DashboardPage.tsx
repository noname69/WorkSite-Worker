import {
  Building2,
  CircleCheck,
  Clock3,
  Eye,
  FolderKanban,
  Pencil,
  UserPlus,
  Users,
} from "lucide-react";
import Badge from "../../components/ui/Badge";
import IconButton from "../../components/ui/IconButton";

const stats = [
  { label: "Active workers", value: "34", description: "Currently active employees", icon: Users },
  { label: "Active sites", value: "8", description: "Sites in progress", icon: Building2 },
  { label: "Projects", value: "17", description: "Whole contracts / objects", icon: FolderKanban },
  { label: "Pending approvals", value: "12", description: "Time entries need review", icon: Clock3 },
];

const sites = [
  {
    name: "Vilnius Business Center",
    address: "Vilnius, Ukmergės g. 120",
    manager: "Marius Kazlauskas",
    workers: 12,
    status: "ACTIVE",
    tone: "success" as const,
  },
  {
    name: "Kaunas Logistics Center",
    address: "Kaunas, Pramonės pr. 15",
    manager: "Tomas Jankauskas",
    workers: 8,
    status: "PLANNED",
    tone: "info" as const,
  },
  {
    name: "Airport Terminal A",
    address: "Vilnius, Rodūnios kelias",
    manager: "Jonas Petrauskas",
    workers: 14,
    status: "PAUSED",
    tone: "warning" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e6e8ec] bg-white p-6 shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6b7280]">Friday, May 29, 2026</p>
            <h1 className="mt-2 text-3xl font-extrabold">WorkSite overview</h1>
            <p className="mt-2 text-sm text-[#6b7280]">
              Monitor workers, sites, assignments and monthly time entries.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-[#e6e8ec] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f2f4f7]">
              <UserPlus size={16} />
              Assign worker
            </button>

            <button className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              <Building2 size={16} />
              Create site
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-[#e6e8ec] bg-white p-5 shadow-[0_8px_28px_rgba(31,41,55,0.05)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6b7280]">{item.label}</p>
                <Icon size={20} className="text-[#6b7280]" />
              </div>

              <p className="mt-3 text-3xl font-extrabold">{item.value}</p>
              <p className="mt-2 text-xs text-[#6b7280]">{item.description}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[#e6e8ec] bg-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <div className="border-b border-[#e6e8ec] px-6 py-5">
          <h3 className="font-extrabold">Active Sites</h3>
          <p className="mt-1 text-sm text-[#6b7280]">Current working locations</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f2f4f7] text-[#6b7280]">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Site</th>
                <th className="px-6 py-3 text-left font-bold">Manager</th>
                <th className="px-6 py-3 text-left font-bold">Workers</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sites.map((site) => (
                <tr key={site.name} className="border-t border-[#e6e8ec] hover:bg-[#fafafa]">
                  <td className="px-6 py-4">
                    <p className="font-bold">{site.name}</p>
                    <p className="mt-1 text-xs text-[#6b7280]">{site.address}</p>
                  </td>

                  <td className="px-6 py-4">{site.manager}</td>
                  <td className="px-6 py-4">{site.workers}</td>

                  <td className="px-6 py-4">
                    <Badge tone={site.tone}>{site.status}</Badge>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <IconButton title="View">
                        <Eye size={16} />
                      </IconButton>
                      <IconButton title="Edit">
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton title="Assign workers">
                        <UserPlus size={16} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e6e8ec] bg-white p-6 shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef8f2]">
            <CircleCheck size={20} />
          </div>

          <div>
            <h3 className="font-extrabold">Frontend template ready</h3>
            <p className="text-sm text-[#6b7280]">
              Continue by replacing mock data with real API calls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
