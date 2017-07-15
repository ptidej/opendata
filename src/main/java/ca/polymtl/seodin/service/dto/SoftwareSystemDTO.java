package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.SoftwareSystem;
import ca.polymtl.seodin.domain.SourceCode;
import ca.polymtl.seodin.repository.DesignPatternRepository;
import ca.polymtl.seodin.repository.SourceCodeRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO representing a Study, with all its details.
 */
public class SoftwareSystemDTO {

    private Long id;

    private String tag;

    SourceCodeRepository sourceCodeRepository;
    List<SourceCode> sourceCodes;
    SourceCodeDTO sourceCodeDTO;
    Set<SourceCodeDTO> sourceCodeDTOS = new HashSet<SourceCodeDTO>();

    DesignPatternRepository designPatternRepository;

    public SoftwareSystemDTO() {
        // Empty constructor needed for Jackson.
    }

    public SoftwareSystemDTO(SoftwareSystem softwareSystem, SourceCodeRepository sourceCodeRepository, DesignPatternRepository designPatternRepository) {
        this.id= softwareSystem.getId();
        this.tag = softwareSystem.getTag();
        this.sourceCodeRepository = sourceCodeRepository;
        this.designPatternRepository = designPatternRepository;
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public Set<SourceCodeDTO> getSourceCodes() {
        sourceCodes = sourceCodeRepository.findAllBySoftwareSystemTag(tag);
        for (SourceCode sourceCode:sourceCodes){
            sourceCodeDTO = new SourceCodeDTO(sourceCode, designPatternRepository);
            sourceCodeDTOS.add(sourceCodeDTO);
        }
        return sourceCodeDTOS;
    }
}
