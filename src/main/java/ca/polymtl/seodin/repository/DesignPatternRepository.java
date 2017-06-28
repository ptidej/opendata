package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.DesignPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the DesignPattern entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DesignPatternRepository extends JpaRepository<DesignPattern,Long> {

    List<DesignPattern> findAllBySourceCodeTag(String tag);

}
