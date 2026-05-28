package online.nonamelab.WorkSite_Work.site.dto;

import online.nonamelab.WorkSite_Work.site.model.SiteStatus;
import online.nonamelab.WorkSite_Work.user.model.User;

import java.time.LocalDateTime;

public record SiteResponse(
        Long id,
        String name,
        String description,
        String country,
        String city,
        String address,
        Double latitude,
        Double longitude,
        SiteStatus status,

        Long managerId,
        String managerFullName,

        LocalDateTime createdAt
) {
}
