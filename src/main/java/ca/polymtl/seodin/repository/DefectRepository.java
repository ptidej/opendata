package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Defect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Defect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefectRepository extends JpaRepository<Defect,Long> {

    List<Defect> findAllByDeveloperName(String name);

}
