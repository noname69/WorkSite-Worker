package online.nonamelab.WorkSite_Work.auth.dto;

import online.nonamelab.WorkSite_Work.user.model.UserRole;

public record AuthResponse(
        String message,
        Long userId,
        String username,
        UserRole role
) {}
