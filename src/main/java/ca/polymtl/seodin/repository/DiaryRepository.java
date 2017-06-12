package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Diary;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Diary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaryRepository extends JpaRepository<Diary,Long> {
    
}
