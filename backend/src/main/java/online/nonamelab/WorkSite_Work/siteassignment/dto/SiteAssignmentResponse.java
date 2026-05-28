package online.nonamelab.WorkSite_Work.siteassignment.dto;

import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignmentStatus;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteRole;

import java.time.LocalDate;

public record SiteAssignmentResponse(
        Long id,

        Long siteId,
        String siteName,

        Long userId,
        String userFullName,

        SiteRole role,
        LocalDate startDate,
        LocalDate endDate,
        SiteAssignmentStatus status
) {
}
