package online.nonamelab.WorkSite_Work.user.dto;

import online.nonamelab.WorkSite_Work.user.model.UserRole;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String username,
        String phoneNumber,
        UserRole role,
        UserStatus status,
        LocalDateTime createdAt,
        LocalDateTime lastLoginAt
) {}
