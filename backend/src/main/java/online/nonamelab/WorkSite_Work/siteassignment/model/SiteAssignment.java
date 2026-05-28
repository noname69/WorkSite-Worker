package online.nonamelab.WorkSite_Work.siteassignment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.nonamelab.WorkSite_Work.site.model.Site;
import online.nonamelab.WorkSite_Work.user.model.User;

import java.time.LocalDate;

@Entity
@Table(name = "site_assignments")
@Getter
@Setter
@NoArgsConstructor
public class SiteAssignment {
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
    private SiteRole roleOnSite;

    @Column(nullable = false)
    private LocalDate startDate;
    private LocalDate endDate;

    @Column(nullable = false)
    private boolean active = true;
}
