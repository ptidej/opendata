package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.DesignPattern;
import ca.polymtl.seodin.domain.SourceCode;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
import ca.polymtl.seodin.repository.DesignPatternRepository;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO representing a Study, with all its details.
 */
public class SourceCodeDTO {

    private Long id;

    private String tag;

    private String uri;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    DesignPatternRepository designPatternRepository;
    List<DesignPattern> designPatterns;
    DesignPatternDTO designPatternDTO;
    Set<DesignPatternDTO> designPatternDTOS = new HashSet<DesignPatternDTO>();

    public SourceCodeDTO() {
        // Empty constructor needed for Jackson.
    }

    public SourceCodeDTO(SourceCode sourceCode, DesignPatternRepository designPatternRepository) {
        this.id = sourceCode.getId();
        this.tag = sourceCode.getTag();
        this.uri = sourceCode.getUri();
        this.status = sourceCode.getStatus();
        this.designPatternRepository = designPatternRepository;
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

    public Set<DesignPatternDTO> getSourceCodes() {
        designPatterns = designPatternRepository.findAllBySourceCodeTag(tag);
        for (DesignPattern designPattern:designPatterns){
            designPatternDTO = new DesignPatternDTO(designPattern);
            designPatternDTOS.add(designPatternDTO);
        }
        return designPatternDTOS;
    }
}
