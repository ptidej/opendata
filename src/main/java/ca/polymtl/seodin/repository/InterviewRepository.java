package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Interview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterviewRepository extends JpaRepository<Interview,Long> {

    List<Interview> findAllByDeveloperName(String name);

}
