package online.nonamelab.WorkSite_Work.user.dto;

import jakarta.validation.constraints.NotNull;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;

public record UpdateUserStatusRequest(

        @NotNull(message = "Status is required")
        UserStatus status
) {
}
