package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the TestCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestCaseRepository extends JpaRepository<TestCase,Long> {

    List<TestCase> findAllByDeveloperName(String name);

}
