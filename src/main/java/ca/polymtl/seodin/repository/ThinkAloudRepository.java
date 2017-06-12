package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.ThinkAloud;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ThinkAloud entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThinkAloudRepository extends JpaRepository<ThinkAloud,Long> {
    
}
