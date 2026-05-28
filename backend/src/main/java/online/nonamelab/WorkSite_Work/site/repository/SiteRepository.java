package online.nonamelab.WorkSite_Work.site.repository;

import online.nonamelab.WorkSite_Work.site.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SiteRepository extends JpaRepository<Site, Long> {
    List<Site> findAllByDeletedAtIsNull();

    Optional<Site> findByIdAndDeletedAtIsNull(Long id);

    boolean existsByNameAndDeletedAtIsNull(String name);
    boolean existsByNameAndIdNotAndDeletedAtIsNull(String name, Long id);
}
