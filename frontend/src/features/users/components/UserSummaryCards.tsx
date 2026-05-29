import {
  CircleCheck,
  CircleSlash,
  HardHat,
  Users,
} from "lucide-react";

import SummaryCard from "../../../components/ui/SummaryCard";
import type { UserResponse } from "../userTypes";

type UserSummaryCardsProps = {
  users: UserResponse[];
};

export default function UserSummaryCards({
  users,
}: UserSummaryCardsProps) {
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE",
  ).length;

  const managers = users.filter(
    (user) => user.role === "MANAGER",
  ).length;

  const suspendedUsers = users.filter(
    (user) => user.status === "SUSPENDED",
  ).length;

  return (
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
  );
}