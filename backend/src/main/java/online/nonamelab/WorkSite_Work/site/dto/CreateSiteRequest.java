package online.nonamelab.WorkSite_Work.site.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import online.nonamelab.WorkSite_Work.site.model.SiteStatus;
import online.nonamelab.WorkSite_Work.user.model.User;

import java.time.LocalDateTime;

public record CreateSiteRequest(

        @NotBlank(message = "Site name is required")
        @Size(min = 2, max = 100)
        String name,

        String description,

        @NotBlank(message = "Country name is required")
        String country,

        @NotBlank(message = "City name is required")
        String city,

        @NotBlank(message = "Address name is required")
        String address,

        Double latitude,
        Double longitude,

        @NotNull(message = "Status is required")
        SiteStatus status,

        Long managerId
) {
}
