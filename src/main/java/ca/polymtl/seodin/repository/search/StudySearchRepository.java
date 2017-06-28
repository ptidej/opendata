package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Study;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Study entity.
 */
public interface StudySearchRepository extends ElasticsearchRepository<Study, Long> {
}
