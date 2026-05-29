package online.nonamelab.WorkSite_Work.siteassignment.dto;

import jakarta.validation.constraints.FutureOrPresent;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteRole;

import java.time.LocalDate;

public record UpdateSiteAssignmentRequest(
        SiteRole role,

        @FutureOrPresent(message = "End date cannot be in the past")
        LocalDate endDate
) {
}
