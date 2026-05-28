package online.nonamelab.WorkSite_Work.user.dto;

import jakarta.validation.constraints.*;
import online.nonamelab.WorkSite_Work.user.model.UserRole;

public record CreateUserRequest(

        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 50)
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(min = 2, max = 50)
        String lastName,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 30)
        String username,

        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 100)
        String password,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number")
        String phoneNumber,

        @NotNull(message = "Role is required")
        UserRole role
) {}
