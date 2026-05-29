import { Archive, Building2, CalendarClock, CircleCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import SummaryCard from "../../../components/ui/SummaryCard";
import type { SiteResponse } from "../siteTypes";

type SiteSummaryCardsProps = {
  sites: SiteResponse[];
};

export default function SiteSummaryCards({ sites }: SiteSummaryCardsProps) {
  const { t } = useTranslation("sites");

  const totalSites = sites.length;
  const activeSites = sites.filter((site) => site.status === "ACTIVE").length;
  const plannedSites = sites.filter((site) => site.status === "PLANNED").length;
  const inactiveSites = sites.filter(
    (site) => site.status === "INACTIVE" || site.status === "ARCHIVED",
  ).length;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <SummaryCard
        title={t("summary.total.title")}
        value={totalSites}
        description={t("summary.total.description")}
        icon={<Building2 size={20} />}
      />

      <SummaryCard
        title={t("summary.active.title")}
        value={activeSites}
        description={t("summary.active.description")}
        icon={<CircleCheck size={20} />}
      />

      <SummaryCard
        title={t("summary.planned.title")}
        value={plannedSites}
        description={t("summary.planned.description")}
        icon={<CalendarClock size={20} />}
      />

      <SummaryCard
        title={t("summary.inactive.title")}
        value={inactiveSites}
        description={t("summary.inactive.description")}
        icon={<Archive size={20} />}
      />
    </section>
  );
}