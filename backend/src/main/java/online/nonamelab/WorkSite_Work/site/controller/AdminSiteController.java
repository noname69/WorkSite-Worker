package online.nonamelab.WorkSite_Work.site.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.site.dto.CreateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.SiteResponse;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteStatusRequest;
import online.nonamelab.WorkSite_Work.site.service.SiteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sites")
@RequiredArgsConstructor
public class AdminSiteController {

    private final SiteService siteService;

    @PostMapping
    public ResponseEntity<SiteResponse> create(
            @Valid @RequestBody CreateSiteRequest request
    ) {
        return ResponseEntity.ok(siteService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<SiteResponse>> getAdminSites() {
        return ResponseEntity.ok(siteService.getAdminSites());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SiteResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSiteRequest request
    ) {
        return ResponseEntity.ok(siteService.update(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SiteResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSiteStatusRequest request
    ) {
        return ResponseEntity.ok(siteService.updateStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        siteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restore(@PathVariable Long id) {
        siteService.restore(id);
        return ResponseEntity.noContent().build();
    }
}
