package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Study;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Study entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyRepository extends JpaRepository<Study,Long> {
    
}
