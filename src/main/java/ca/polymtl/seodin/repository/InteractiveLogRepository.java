package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.InteractiveLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the InteractiveLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InteractiveLogRepository extends JpaRepository<InteractiveLog,Long> {

    List<InteractiveLog> findAllByDeveloperName(String name);

}
