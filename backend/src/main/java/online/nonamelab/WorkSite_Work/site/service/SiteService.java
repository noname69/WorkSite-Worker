package online.nonamelab.WorkSite_Work.site.service;

import online.nonamelab.WorkSite_Work.site.dto.CreateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.SiteResponse;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteStatusRequest;

import java.util.List;

public interface SiteService {
    // CREATE
    SiteResponse create(CreateSiteRequest request);

    // GET ALL
    List<SiteResponse> getSites();
    List<SiteResponse> getAdminSites();

    // GET BY ID
    SiteResponse getById(Long id);

    // UPDATE SITE INFO
    SiteResponse update(Long id, UpdateSiteRequest request);

    // UPDATE STATUS ONLY
    SiteResponse updateStatus(Long id, UpdateSiteStatusRequest request);

    // SOFT DELETE
    void delete(Long id);

    // RESTORE
    void restore(Long id);
}
