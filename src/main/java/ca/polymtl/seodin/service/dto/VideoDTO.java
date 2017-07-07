package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Video;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

/**
 * A DTO representing a Study, with all its details.
 */
public class VideoDTO {

    private Long id;

    private String tag;

    private String description;

    private Integer duration;

    private String uri;

    private LocalDate recorded;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public VideoDTO() {
        // Empty constructor needed for Jackson.
    }

    public VideoDTO(Video video) {
        this.id= video.getId();
        this.tag = video.getTag();
        this.description = video.getDescription();
        this.duration = video.getDuration();
        this.uri = video.getUri();
        this.status = video.getStatus();
        this.recorded = video.getRecorded();
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

    public Integer getDuration() {
        return duration;
    }

    public String getUri() {
        return uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public LocalDate getRecorded() {
        return recorded;
    }
}
