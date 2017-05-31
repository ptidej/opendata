package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.InteractiveLog;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the InteractiveLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InteractiveLogRepository extends JpaRepository<InteractiveLog,Long> {

}
