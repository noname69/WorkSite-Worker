package online.nonamelab.WorkSite_Work.site.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.site.dto.CreateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.SiteResponse;
import online.nonamelab.WorkSite_Work.site.service.SiteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
@RequiredArgsConstructor
public class SiteController {

    private final SiteService siteService;

    @GetMapping
    public ResponseEntity<List<SiteResponse>> getSites() {
        return ResponseEntity.ok(siteService.getSites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(siteService.getById(id));
    }

}
