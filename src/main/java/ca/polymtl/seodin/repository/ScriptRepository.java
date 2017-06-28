package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Script entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScriptRepository extends JpaRepository<Script,Long> {

    List<Script> findAllByStudyTitle(String title);

}
