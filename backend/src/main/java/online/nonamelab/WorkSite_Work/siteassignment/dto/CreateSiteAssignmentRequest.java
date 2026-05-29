package online.nonamelab.WorkSite_Work.siteassignment.dto;

import jakarta.validation.constraints.NotNull;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteRole;

import java.time.LocalDate;

public record CreateSiteAssignmentRequest(
        @NotNull(message = "Site id is required")
        Long siteId,

        @NotNull(message = "User id is required")
        Long userId,

        @NotNull(message = "Role is required")
        SiteRole role,

        LocalDate startDate,
        LocalDate endDate
) {}