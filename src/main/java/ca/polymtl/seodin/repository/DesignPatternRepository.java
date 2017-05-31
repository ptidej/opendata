package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.DesignPattern;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DesignPattern entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DesignPatternRepository extends JpaRepository<DesignPattern,Long> {

}
