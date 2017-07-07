package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Note entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteRepository extends JpaRepository<Note,Long> {

    List<Note> findAllByInterviewTag(String tag);

}
