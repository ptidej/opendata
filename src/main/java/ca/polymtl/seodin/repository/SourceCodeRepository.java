package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.SourceCode;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SourceCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceCodeRepository extends JpaRepository<SourceCode,Long> {

}
