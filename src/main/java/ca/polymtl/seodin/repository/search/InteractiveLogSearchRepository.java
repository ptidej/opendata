package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.InteractiveLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the InteractiveLog entity.
 */
public interface InteractiveLogSearchRepository extends ElasticsearchRepository<InteractiveLog, Long> {
}
