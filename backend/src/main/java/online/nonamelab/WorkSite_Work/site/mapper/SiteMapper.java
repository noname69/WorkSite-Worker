package online.nonamelab.WorkSite_Work.site.mapper;

import online.nonamelab.WorkSite_Work.site.dto.CreateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.SiteResponse;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteRequest;
import online.nonamelab.WorkSite_Work.site.model.Site;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SiteMapper {
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(
            target = "managerFullName",
            expression = "java(site.getManager().getFirstName() + \" \" + site.getManager().getLastName())"
    )
    SiteResponse toResponse(Site site);

    List<SiteResponse> toResponseList(List<Site> sites);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    Site toEntity(CreateSiteRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    void updateFromDto(UpdateSiteRequest request, @MappingTarget Site site);
}
