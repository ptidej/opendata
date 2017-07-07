package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Note;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * A DTO representing a Study, with all its details.
 */
public class NoteDTO {

    private Long id;

    private String tag;

    private String description;

    private String uri;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public NoteDTO() {
        // Empty constructor needed for Jackson.
    }

    public NoteDTO(Note note) {
        this.id= note.getId();
        this.tag = note.getTag();
        this.description = note.getDescription();
        this.uri = note.getUri();
        this.status = note.getStatus();
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

    public String getUri() {
        return uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

}
