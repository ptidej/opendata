package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.ThinkAloud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the ThinkAloud entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThinkAloudRepository extends JpaRepository<ThinkAloud,Long> {

    List<ThinkAloud> findAllByDeveloperName(String name);

}
