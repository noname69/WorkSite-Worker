package online.nonamelab.WorkSite_Work.user.dto;

import online.nonamelab.WorkSite_Work.user.model.UserRole;

public record MeResponse(
        Long id,
        String firstName,
        String lastName,
        String username,
        String email,
        UserRole role,
        String phoneNumber
) {}
