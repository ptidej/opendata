package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.SoftwareSystem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SoftwareSystem entity.
 */
public interface SoftwareSystemSearchRepository extends ElasticsearchRepository<SoftwareSystem, Long> {
}
