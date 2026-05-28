package online.nonamelab.WorkSite_Work.site.dto;

import jakarta.validation.constraints.Size;
import online.nonamelab.WorkSite_Work.site.model.SiteStatus;

public record UpdateSiteRequest(

        @Size(min = 2, max = 100)
        String name,

        String description,

        String country,

        String city,

        String address,

        Double latitude,
        Double longitude,

        Long managerId
) {
}
