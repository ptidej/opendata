package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Developer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Developer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeveloperRepository extends JpaRepository<Developer,Long> {

    List<Developer> findAllByStudyTitle(String title);

}
