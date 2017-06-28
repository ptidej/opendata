package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.SourceCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the SourceCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceCodeRepository extends JpaRepository<SourceCode,Long> {

    List<SourceCode> findAllBySoftwareSystemTag(String tag);

}
