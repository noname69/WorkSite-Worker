package online.nonamelab.WorkSite_Work.siteassignment.mapper;

import online.nonamelab.WorkSite_Work.siteassignment.dto.SiteAssignmentResponse;
import online.nonamelab.WorkSite_Work.siteassignment.dto.UpdateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignment;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SiteAssignmentMapper {

    @Mapping(target = "siteId", source = "site.id")
    @Mapping(target = "siteName", source = "site.name")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userFullName", expression = "java(getUserFullName(assignment))")
    SiteAssignmentResponse toResponse(SiteAssignment assignment);

    List<SiteAssignmentResponse> toResponseList(List<SiteAssignment> assignments);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "site", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "startDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    void updateFromDto(UpdateSiteAssignmentRequest request, @MappingTarget SiteAssignment assignment);

    default String getUserFullName(SiteAssignment assignment) {
        if (assignment.getUser() == null) {
            return null;
        }

        String firstName = assignment.getUser().getFirstName();
        String lastName = assignment.getUser().getLastName();

        return ((firstName == null ? "" : firstName) + " " +
                (lastName == null ? "" : lastName)).trim();
    }
}
