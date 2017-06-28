package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Video;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Video entity.
 */
public interface VideoSearchRepository extends ElasticsearchRepository<Video, Long> {
}
