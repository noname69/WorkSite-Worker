package online.nonamelab.WorkSite_Work.user.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import online.nonamelab.WorkSite_Work.user.model.UserRole;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;

public record UpdateUserRequest(
        @Size(min = 2, max = 50)
        String firstName,

        @Size(min = 2, max = 50)
        String lastName,

        @Pattern(regexp = "^\\+?[0-9]{7,15}$")
        String phoneNumber
) {
}
