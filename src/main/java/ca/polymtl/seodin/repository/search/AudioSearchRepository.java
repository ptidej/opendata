package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Audio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Audio entity.
 */
public interface AudioSearchRepository extends ElasticsearchRepository<Audio, Long> {
}
