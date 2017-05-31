package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.SourceCode;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SourceCode entity.
 */
public interface SourceCodeSearchRepository extends ElasticsearchRepository<SourceCode, Long> {
}
