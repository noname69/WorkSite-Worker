package online.nonamelab.WorkSite_Work.user.dto;

import jakarta.validation.constraints.Size;

public record UpdateMeRequest(

        @Size(min = 2, max = 50)
        String firstName,

        @Size(min = 2, max = 50)
        String lastName,

        @Size(min = 8, max = 20)
        String phoneNumber
) {}
