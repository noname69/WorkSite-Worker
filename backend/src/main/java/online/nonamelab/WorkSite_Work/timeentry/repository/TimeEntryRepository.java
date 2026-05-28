package online.nonamelab.WorkSite_Work.timeentry.repository;

import online.nonamelab.WorkSite_Work.timeentry.model.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long> {
//    List<TimeEntry> findByUserId(Long userId);
//    List<TimeEntry> findByProjectId(Long projectId);
//    List<TimeEntry> findBySiteId(Long siteId);
//    List<TimeEntry> findByWorkDate(LocalDate workDate);
}
