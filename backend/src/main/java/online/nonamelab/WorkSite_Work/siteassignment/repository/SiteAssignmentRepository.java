package online.nonamelab.WorkSite_Work.siteassignment.repository;

import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignment;
import online.nonamelab.WorkSite_Work.siteassignment.model.SiteAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SiteAssignmentRepository extends JpaRepository<SiteAssignment, Long> {

    List<SiteAssignment> findAllByDeletedAtIsNull();

    Optional<SiteAssignment> findByIdAndDeletedAtIsNull(Long id);

    List<SiteAssignment> findAllBySiteIdAndDeletedAtIsNull(Long siteId);

    List<SiteAssignment> findAllByUserIdAndDeletedAtIsNull(Long userId);

    boolean existsBySiteIdAndUserIdAndStatusAndDeletedAtIsNull(
            Long siteId,
            Long userId,
            SiteAssignmentStatus status
    );
    boolean existsByUserIdAndStatusAndDeletedAtIsNull(
            Long userId,
            SiteAssignmentStatus status
    );

    @Query("""
        SELECT COUNT(sa) > 0
        FROM SiteAssignment sa
        WHERE sa.user.id = :userId
          AND sa.deletedAt IS NULL
          AND sa.startDate <= :endDate
          AND (sa.endDate IS NULL OR sa.endDate >= :startDate)
        """)
    boolean existsOverlappingAssignment(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
}
