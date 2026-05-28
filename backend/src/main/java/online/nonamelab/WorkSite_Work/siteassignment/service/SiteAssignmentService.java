package online.nonamelab.WorkSite_Work.siteassignment.service;

import online.nonamelab.WorkSite_Work.siteassignment.dto.CreateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.dto.SiteAssignmentResponse;
import online.nonamelab.WorkSite_Work.siteassignment.dto.UpdateSiteAssignmentRequest;

import java.util.List;

public interface SiteAssignmentService {
    SiteAssignmentResponse create(CreateSiteAssignmentRequest request);

    List<SiteAssignmentResponse> getAssignments();

    List<SiteAssignmentResponse> getAssignmentsBySite(Long siteId);

    List<SiteAssignmentResponse> getMyAssignments();

    SiteAssignmentResponse getById(Long id);

    SiteAssignmentResponse update(Long id, UpdateSiteAssignmentRequest request);

    void finish(Long id);

    void delete(Long id);

    void restore(Long id);
}
