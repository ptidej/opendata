package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Developer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Developer entity.
 */
public interface DeveloperSearchRepository extends ElasticsearchRepository<Developer, Long> {
}
