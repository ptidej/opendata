package ca.polymtl.seodin.repository.search;

import ca.polymtl.seodin.domain.TestCase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestCase entity.
 */
public interface TestCaseSearchRepository extends ElasticsearchRepository<TestCase, Long> {
}
