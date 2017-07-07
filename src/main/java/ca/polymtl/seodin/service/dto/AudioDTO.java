package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Audio;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * A DTO representing a Study, with all its details.
 */
public class AudioDTO {

    private Long id;

    private String tag;

    private String description;

    private Integer duration;

    private String uri;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public AudioDTO() {
        // Empty constructor needed for Jackson.
    }

    public AudioDTO(Audio Audio) {
        this.id= Audio.getId();
        this.tag = Audio.getTag();
        this.description = Audio.getDescription();
        this.duration = Audio.getDuration();
        this.uri = Audio.getUri();
        this.status =Audio.getStatus();
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

    public void setDescription(String description) {
        this.description = description;
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
}
