package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Script;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Script entity.
 */
public interface ScriptSearchRepository extends ElasticsearchRepository<Script, Long> {
}
