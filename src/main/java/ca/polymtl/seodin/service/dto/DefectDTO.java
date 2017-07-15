package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Defect;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
import ca.polymtl.seodin.domain.enumeration.Priority;
import ca.polymtl.seodin.domain.enumeration.Resolution;
import ca.polymtl.seodin.domain.enumeration.Severity;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

/**
 * A DTO representing a Study, with all its details.
 */
public class DefectDTO {

    private Long id;

    private String ticket;

    private String summary;

    private String description;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    @Enumerated(EnumType.STRING)
    private Resolution resolution;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private LocalDate recorded;

    private LocalDate modified;

    public DefectDTO() {
        // Empty constructor needed for Jackson.
    }

    public DefectDTO(Defect defect) {
        this.id= defect.getId();
        this.ticket = defect.getTicket();
        this.summary = defect.getSummary();
        this.description = defect.getDescription();
        this.status = defect.getStatus();
        this.resolution = defect.getResolution();
        this.severity = defect.getSeverity();
        this.priority = defect.getPriority();
        this.recorded = defect.getRecorded();
        this.modified = defect.getModified();
    }

    public Long getId() {
        return id;
    }

    public String getTicket() {
        return ticket;
    }

    public String getSummary() {
        return summary;
    }

    public String getDescription() {
        return description;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public Resolution getResolution() {
        return resolution;
    }

    public Severity getSeverity() {
        return severity;
    }

    public Priority getPriority() {
        return priority;
    }

    public LocalDate getRecorded() {
        return recorded;
    }

    public LocalDate getModified() {
        return modified;
    }
}
