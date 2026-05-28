package online.nonamelab.WorkSite_Work.timeentry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.nonamelab.WorkSite_Work.site.model.Site;
import online.nonamelab.WorkSite_Work.user.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "time_entries")
@Getter
@Setter
@NoArgsConstructor
public class TimeEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // WHO WORKED
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // WHERE (optional but useful for filtering)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    // DATE OF WORK
    @Column(nullable = false)
    private LocalDate workDate;

    // TIME RANGE
    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    // CALCULATED OR MANUAL
    @Column(nullable = false)
    private Double hoursWorked;

    private Double overtimeHours;

    // OPTIONAL DISTANCE TRACKING (you wanted this earlier)
    private Double distanceKm;

    // STATUS FLOW
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TimeEntryStatus status;

    // APPROVAL
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    private LocalDateTime approvedAt;

    // OPTIONAL NOTE
    private String note;
}
