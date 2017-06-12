package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Video;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Video entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoRepository extends JpaRepository<Video,Long> {
    
}
