package online.nonamelab.WorkSite_Work.siteassignment.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.siteassignment.dto.CreateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.dto.SiteAssignmentResponse;
import online.nonamelab.WorkSite_Work.siteassignment.dto.UpdateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.service.SiteAssignmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/site-assignments")
@RequiredArgsConstructor
public class AdminSiteAssignmentController {

    private final SiteAssignmentService siteAssignmentService;

    // Assign worker to site
    @PostMapping
    public ResponseEntity<SiteAssignmentResponse> create(
            @Valid @RequestBody CreateSiteAssignmentRequest request
    ) {
        return ResponseEntity.ok(siteAssignmentService.create(request));
    }

    // Admin/manager: get all assignments
    @GetMapping
    public ResponseEntity<List<SiteAssignmentResponse>> getAssignments() {
        return ResponseEntity.ok(siteAssignmentService.getAssignments());
    }

    // Admin/manager: get one assignment
    @GetMapping("/{id}")
    public ResponseEntity<SiteAssignmentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(siteAssignmentService.getById(id));
    }

    // Admin/manager: get assignments for one site
    @GetMapping("/site/{siteId}")
    public ResponseEntity<List<SiteAssignmentResponse>> getBySite(
            @PathVariable Long siteId
    ) {
        return ResponseEntity.ok(siteAssignmentService.getAssignmentsBySite(siteId));
    }

    // Update role or end date
    @PatchMapping("/{id}")
    public ResponseEntity<SiteAssignmentResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSiteAssignmentRequest request
    ) {
        return ResponseEntity.ok(siteAssignmentService.update(id, request));
    }

    // Finish assignment
    @PatchMapping("/{id}/finish")
    public ResponseEntity<Void> finish(@PathVariable Long id) {
        siteAssignmentService.finish(id);
        return ResponseEntity.noContent().build();
    }

    // Soft delete assignment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        siteAssignmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Restore soft-deleted assignment
    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restore(@PathVariable Long id) {
        siteAssignmentService.restore(id);
        return ResponseEntity.noContent().build();
    }
}
