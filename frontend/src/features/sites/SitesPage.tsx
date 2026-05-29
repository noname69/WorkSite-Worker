import { Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import Badge from "../../components/ui/Badge";
import IconButton from "../../components/ui/IconButton";

export default function SitesPage() {
  return (
    <div className="rounded-2xl border border-[#e6e8ec] bg-white shadow-[0_8px_28px_rgba(31,41,55,0.05)]">
      <div className="border-b border-[#e6e8ec] px-6 py-5">
        <h1 className="font-extrabold">Sites</h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          Site list placeholder. Connect this page to GET /api/sites.
        </p>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1">
          <Badge tone="success">ACTIVE</Badge>

          <IconButton title="View">
            <Eye size={16} />
          </IconButton>

          <IconButton title="Edit">
            <Pencil size={16} />
          </IconButton>

          <IconButton title="Assign workers">
            <UserPlus size={16} />
          </IconButton>

          <IconButton title="Delete" tone="danger">
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
