package ca.polymtl.seodin.repository;

import ca.polymtl.seodin.domain.SoftwareSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the SoftwareSystem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoftwareSystemRepository extends JpaRepository<SoftwareSystem,Long> {

    List<SoftwareSystem> findAllByStudyTitle(String id);

}
