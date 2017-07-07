package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Diary;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

/**
 * A DTO representing a Study, with all its details.
 */
public class DiaryDTO {

    private Long id;

    private String uri;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public DiaryDTO() {
        // Empty constructor needed for Jackson.
    }

    public DiaryDTO(Diary diary) {
        this.id= diary.getId();
        this.uri = diary.getUri();
        this.status = diary.getStatus();
    }

    public Long getId() {
        return id;
    }

    public String getUri() {
        return uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }
}
