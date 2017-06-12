package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Audio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Audio entity.
 */
@Repository
public interface AudioRepository extends JpaRepository<Audio,Long> {

}
