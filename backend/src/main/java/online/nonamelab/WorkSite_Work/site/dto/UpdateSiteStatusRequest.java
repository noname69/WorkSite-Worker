package online.nonamelab.WorkSite_Work.site.dto;

import jakarta.validation.constraints.NotNull;
import online.nonamelab.WorkSite_Work.site.model.SiteStatus;

public record UpdateSiteStatusRequest(
        @NotNull(message = "Status is required")
        SiteStatus status
) {
}
