package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findAllByStudyTitle(String title);

}
