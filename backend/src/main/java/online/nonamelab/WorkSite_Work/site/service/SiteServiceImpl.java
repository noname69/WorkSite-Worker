package online.nonamelab.WorkSite_Work.site.service;

import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.exception.core.BadRequestException;
import online.nonamelab.WorkSite_Work.exception.site.InvalidSiteStateException;
import online.nonamelab.WorkSite_Work.exception.site.SiteNameAlreadyExistsException;
import online.nonamelab.WorkSite_Work.exception.site.SiteNotFoundException;
import online.nonamelab.WorkSite_Work.exception.user.InvalidUserStateException;
import online.nonamelab.WorkSite_Work.exception.user.UserNotFoundException;
import online.nonamelab.WorkSite_Work.security.current.CurrentUser;
import online.nonamelab.WorkSite_Work.site.dto.CreateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.SiteResponse;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteRequest;
import online.nonamelab.WorkSite_Work.site.dto.UpdateSiteStatusRequest;
import online.nonamelab.WorkSite_Work.site.mapper.SiteMapper;
import online.nonamelab.WorkSite_Work.site.model.Site;
import online.nonamelab.WorkSite_Work.site.model.SiteStatus;
import online.nonamelab.WorkSite_Work.site.repository.SiteRepository;
import online.nonamelab.WorkSite_Work.user.model.User;
import online.nonamelab.WorkSite_Work.user.model.UserRole;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;
import online.nonamelab.WorkSite_Work.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;
    private final SiteMapper siteMapper;
    private final UserRepository userRepository;
    private final CurrentUser currentUser;

    @Override
    public SiteResponse create(CreateSiteRequest request) {

        if (siteRepository.existsByNameAndDeletedAtIsNull(request.name())) {
            throw new SiteNameAlreadyExistsException();
        }

        User manager = userRepository.findByIdAndDeletedAtIsNull(request.managerId())
                .orElseThrow(UserNotFoundException::new);

        // ONLY MANAGER CAN MANAGE SITE
        if (manager.getRole() != UserRole.MANAGER) {

            throw new InvalidUserStateException(
                    "Only managers can be assigned to sites"
            );
        }

        if (manager.getStatus() != UserStatus.ACTIVE) {
            throw new InvalidUserStateException("Manager account must be active");
        }

        Site site = siteMapper.toEntity(request);
        site.setManager(manager);
        if (site.getStatus() == null) {
            site.setStatus(SiteStatus.PLANNED);
        }

        return siteMapper.toResponse(siteRepository.save(site));
    }

    @Override
    public List<SiteResponse> getSites() {
        return siteRepository.findAllByDeletedAtIsNull()
                .stream()
                .map(siteMapper::toResponse)
                .toList();
    }

    @Override
    public List<SiteResponse> getAdminSites() {
        return siteRepository.findAll()
                .stream()
                .map(siteMapper::toResponse)
                .toList();
    }

    @Override
    public SiteResponse getById(Long id) {
        Site site = siteRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(SiteNotFoundException::new);

        return siteMapper.toResponse(site);
    }

    @Override
    public SiteResponse update(Long id, UpdateSiteRequest request) {
        Site site = siteRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(SiteNotFoundException::new);

        if (request.name() != null &&
                siteRepository.existsByNameAndIdNotAndDeletedAtIsNull(request.name(), id)) {
            throw new SiteNameAlreadyExistsException();
        }

        siteMapper.updateFromDto(request, site);

        if (request.managerId() != null) {
            User manager = userRepository.findByIdAndDeletedAtIsNull(request.managerId())
                    .orElseThrow(UserNotFoundException::new);

            if (manager.getRole() != UserRole.MANAGER) {
                throw new InvalidUserStateException("Only managers can be assigned to sites");
            }

            if (manager.getStatus() != UserStatus.ACTIVE) {
                throw new InvalidUserStateException("Manager account must be active");
            }

            site.setManager(manager);
        }

        return siteMapper.toResponse(siteRepository.save(site));
    }

    @Override
    public SiteResponse updateStatus(Long id, UpdateSiteStatusRequest request) {
        Site site = siteRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(SiteNotFoundException::new);

        site.setStatus(request.status());

        return siteMapper.toResponse(siteRepository.save(site));
    }

    @Override
    public void delete(Long id) {
        Site site = siteRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(SiteNotFoundException::new);

        site.setDeletedAt(LocalDateTime.now());
        site.setStatus(SiteStatus.INACTIVE);

        siteRepository.save(site);
    }

    @Override
    public void restore(Long id) {
        Site site = siteRepository.findById(id)
                .orElseThrow(SiteNotFoundException::new);

        if (site.getDeletedAt() == null) {
            throw new InvalidSiteStateException("Site is not deleted");
        }

        site.setDeletedAt(null);
        site.setStatus(SiteStatus.ACTIVE);

        siteRepository.save(site);
    }
}
