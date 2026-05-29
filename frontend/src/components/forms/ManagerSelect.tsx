import { useEffect } from "react";

import { useUserStore } from "../../features/users/userStore";

type ManagerSelectProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function ManagerSelect({
  value,
  onChange,
}: ManagerSelectProps) {
  const managers = useUserStore((state) => state.managers);
  const fetchManagers = useUserStore((state) => state.fetchManagers);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
    >
      <option value="">Select manager</option>

      {managers.map((manager) => (
        <option key={manager.id} value={manager.id}>
          {manager.firstName} {manager.lastName}
        </option>
      ))}
    </select>
  );
}