package online.nonamelab.WorkSite_Work.siteassignment.service;

import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;
import online.nonamelab.WorkSite_Work.exception.site.SiteNotFoundException;
import online.nonamelab.WorkSite_Work.exception.user.InvalidUserStateException;
import online.nonamelab.WorkSite_Work.exception.user.UserNotFoundException;
import online.nonamelab.WorkSite_Work.security.current.CurrentUser;
import online.nonamelab.WorkSite_Work.site.model.Site;
import online.nonamelab.WorkSite_Work.site.repository.SiteRepository;
import online.nonamelab.WorkSite_Work.siteassignment.dto.CreateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.dto.SiteAssignmentResponse;
import online.nonamelab.WorkSite_Work.siteassignment.dto.UpdateSiteAssignmentRequest;
import online.nonamelab.WorkSite_Work.siteassignment.mapper.SiteAssignmentMapper;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignment;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignmentStatus;
import online.nonamelab.WorkSite_Work.siteassignment.repository.SiteAssignmentRepository;
import online.nonamelab.WorkSite_Work.user.model.User;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;
import online.nonamelab.WorkSite_Work.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SiteAssignmentServiceImpl implements SiteAssignmentService {

    private final SiteAssignmentRepository siteAssignmentRepository;
    private final SiteAssignmentMapper siteAssignmentMapper;
    private final SiteRepository siteRepository;
    private final UserRepository userRepository;
    private final CurrentUser currentUser;

    @Override
    public SiteAssignmentResponse create(CreateSiteAssignmentRequest request) {

        // =========================
        // LOAD SITE
        // =========================
        Site site = siteRepository.findByIdAndDeletedAtIsNull(request.siteId())
                .orElseThrow(SiteNotFoundException::new);

        // =========================
        // LOAD USER
        // =========================
        User user = userRepository.findByIdAndDeletedAtIsNull(request.userId())
                .orElseThrow(UserNotFoundException::new);

        // =========================
        // ONLY ACTIVE USERS CAN BE ASSIGNED
        // =========================
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new InvalidUserStateException(
                    "User account must be active"
            );
        }

        // =========================
        // VALIDATE ASSIGNMENT DATES
        // =========================
        LocalDate startDate = request.startDate() != null
                ? request.startDate()
                : LocalDate.now();

        LocalDate endDate = request.endDate();

        if (endDate != null && endDate.isBefore(startDate)) {
            throw new BadRequestException(
                    "End date cannot be before start date"
            );
        }

        // =========================
        // PREVENT DATE OVERLAPS
        // USER CANNOT BE ASSIGNED TO
        // MULTIPLE SITES IN SAME PERIOD
        // =========================
        LocalDate effectiveEndDate = endDate != null
                ? endDate
                : LocalDate.of(9999, 12, 31);

        if (siteAssignmentRepository.existsOverlappingAssignment(
                user.getId(),
                startDate,
                effectiveEndDate
        )) {
            throw new BadRequestException(
                    "User already has assignment in this date range"
            );
        }

        // =========================
        // CREATE ASSIGNMENT
        // =========================
        SiteAssignment assignment = new SiteAssignment();

        assignment.setSite(site);
        assignment.setUser(user);
        assignment.setRole(request.role());
        assignment.setStartDate(startDate);
        assignment.setEndDate(endDate);

        // ACTIVE -> no end date
        // FINISHED -> has end date
        assignment.setStatus(
                endDate == null
                        ? SiteAssignmentStatus.ACTIVE
                        : SiteAssignmentStatus.FINISHED
        );

        SiteAssignment savedAssignment =
                siteAssignmentRepository.save(assignment);

        return siteAssignmentMapper.toResponse(savedAssignment);
    }

    @Override
    public List<SiteAssignmentResponse> getAssignments() {

        // Admin/manager view: return all non-deleted assignments
        return siteAssignmentRepository.findAllByDeletedAtIsNull()
                .stream()
                .map(siteAssignmentMapper::toResponse)
                .toList();
    }

    @Override
    public List<SiteAssignmentResponse> getAssignmentsBySite(Long siteId) {

        // First check that site exists and is not deleted
        siteRepository.findByIdAndDeletedAtIsNull(siteId)
                .orElseThrow(SiteNotFoundException::new);

        // Return all non-deleted assignments for selected site
        return siteAssignmentRepository.findAllBySiteIdAndDeletedAtIsNull(siteId)
                .stream()
                .map(siteAssignmentMapper::toResponse)
                .toList();
    }

    @Override
    public List<SiteAssignmentResponse> getMyAssignments() {

        // Get currently logged-in user from JWT
        User current = currentUser.get();

        // Return assignments only for current user
        return siteAssignmentRepository.findAllByUserIdAndDeletedAtIsNull(current.getId())
                .stream()
                .map(siteAssignmentMapper::toResponse)
                .toList();
    }

    @Override
    public SiteAssignmentResponse getById(Long id) {

        // Get one assignment by id, ignoring soft-deleted rows
        SiteAssignment assignment = siteAssignmentRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new BadRequestException("Site assignment not found"));

        return siteAssignmentMapper.toResponse(assignment);
    }

    @Override
    public SiteAssignmentResponse update(Long id, UpdateSiteAssignmentRequest request) {
        return null;
    }

    @Override
    public void finish(Long id) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void restore(Long id) {

    }
}
