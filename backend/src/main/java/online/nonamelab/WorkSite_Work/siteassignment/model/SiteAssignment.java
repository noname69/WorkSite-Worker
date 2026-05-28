package online.nonamelab.WorkSite_Work.siteassignment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.nonamelab.WorkSite_Work.common.entity.BaseEntity;
import online.nonamelab.WorkSite_Work.site.model.Site;
import online.nonamelab.WorkSite_Work.user.model.User;

import java.time.LocalDate;

@Entity
@Table(
        name = "site_assignments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_site_assignment_user_site",
                        columnNames = {"site_id", "user_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class SiteAssignment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // relation to site
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    // relation to user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SiteRole role;

    @Column(nullable = false)
    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SiteAssignmentStatus status;
}
