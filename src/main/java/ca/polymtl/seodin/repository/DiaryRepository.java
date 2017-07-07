package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Diary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaryRepository extends JpaRepository<Diary,Long> {

    List<Diary> findAllByDeveloperName(String name);

}
