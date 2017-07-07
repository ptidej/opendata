package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.TestCase;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * A DTO representing a Study, with all its details.
 */
public class TestCaseDTO {

    private Long id;

    private String tag;

    private String uri;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public TestCaseDTO() {
        // Empty constructor needed for Jackson.
    }

    public TestCaseDTO(TestCase testCase) {
        this.id= testCase.getId();
        this.tag = testCase.getTag();
        this.uri = testCase.getUri();
        this.status = testCase.getStatus();
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public String getUri() {
        return uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }
}
