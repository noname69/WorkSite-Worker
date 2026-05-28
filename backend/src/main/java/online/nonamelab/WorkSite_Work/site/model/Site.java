package online.nonamelab.WorkSite_Work.site.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.nonamelab.WorkSite_Work.common.entiry.BaseEntity;
import online.nonamelab.WorkSite_Work.user.model.User;

@Entity
@Table(name = "sites")
@Getter
@Setter
@NoArgsConstructor
public class Site extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    // LOCATION INFO
    private String country;
    private String city;
    private String address;

    // Optional GPS (future check-in / tracking)
    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SiteStatus status;

    // RESPONSIBLE MANAGER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;

}
