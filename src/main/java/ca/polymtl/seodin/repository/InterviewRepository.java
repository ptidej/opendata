package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Interview;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Interview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterviewRepository extends JpaRepository<Interview,Long> {
    
}
