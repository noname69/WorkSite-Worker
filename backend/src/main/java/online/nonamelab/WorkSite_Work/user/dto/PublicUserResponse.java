package online.nonamelab.WorkSite_Work.user.dto;

import online.nonamelab.WorkSite_Work.user.model.UserRole;

public record PublicUserResponse(
        Long id,
        String firstName,
        String lastName,
        UserRole role
) {}
