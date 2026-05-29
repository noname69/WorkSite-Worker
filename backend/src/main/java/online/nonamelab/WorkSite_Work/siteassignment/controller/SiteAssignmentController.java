package online.nonamelab.WorkSite_Work.siteassignment.controller;

import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.siteassignment.dto.SiteAssignmentResponse;
import online.nonamelab.WorkSite_Work.siteassignment.service.SiteAssignmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/site-assignments")
@RequiredArgsConstructor
public class SiteAssignmentController {

    private final SiteAssignmentService siteAssignmentService;

    // Current user: get own site assignments
    @GetMapping("/me")
    public ResponseEntity<List<SiteAssignmentResponse>> getMyAssignments() {
        return ResponseEntity.ok(siteAssignmentService.getMyAssignments());
    }

}
