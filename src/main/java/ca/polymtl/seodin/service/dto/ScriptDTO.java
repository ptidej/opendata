package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Script;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * A DTO representing a Study, with all its details.
 */
public class ScriptDTO {

    private Long id;

    private String tag;

    private String description;

    private String sourceCode;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public ScriptDTO() {
        // Empty constructor needed for Jackson.
    }

    public ScriptDTO(Script script) {
        this.id= script.getId();
        this.tag = script.getTag();
        this.description = script.getDescription();
        this.sourceCode = script.getSourceCode();
        this.status = script.getStatus();
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public String getDescription() {
        return description;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public ArtifactStatus getStatus() {
        return status;
    }
}
