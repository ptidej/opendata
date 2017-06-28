package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.Interview;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Interview entity.
 */
public interface InterviewSearchRepository extends ElasticsearchRepository<Interview, Long> {
}
