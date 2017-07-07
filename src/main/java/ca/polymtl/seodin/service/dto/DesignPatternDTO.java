package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.DesignPattern;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * A DTO representing a Study, with all its details.
 */
public class DesignPatternDTO {

    private Long id;

    private String tag;

    private String xmlDescriptor;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public DesignPatternDTO() {
        // Empty constructor needed for Jackson.
    }

    public DesignPatternDTO(DesignPattern designPattern) {
        this.id= designPattern.getId();
        this.tag = designPattern.getTag();
        this.xmlDescriptor = designPattern.getXmlDescriptor();
        this.status = designPattern.getStatus();
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public String getXmlDescriptor() {
        return xmlDescriptor;
    }

    public ArtifactStatus getStatus() {
        return status;
    }
}
