package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.InteractiveLog;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
import ca.polymtl.seodin.domain.enumeration.LogKind;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

/**
 * A DTO representing a Study, with all its details.
 */
public class InteractiveLogDTO {

    private Long id;

    @Enumerated(EnumType.STRING)
    private LogKind kind;

    private String sourceHandle;

    private String origin;

    private String delta;

    private LocalDate recorded;

    @Enumerated(EnumType.STRING)
    private ArtifactStatus status;

    public InteractiveLogDTO() {
        // Empty constructor needed for Jackson.
    }

    public InteractiveLogDTO(InteractiveLog interactiveLog) {
        this.id= interactiveLog.getId();
        this.kind = interactiveLog.getKind();
        this.sourceHandle = interactiveLog.getSourceHandle();
        this.origin = interactiveLog.getOrigin();
        this.delta= interactiveLog.getDelta();
        this.recorded = interactiveLog.getRecorded();
        this.status = interactiveLog.getStatus();
    }

    public Long getId() {
        return id;
    }

    public LogKind getKind() {
        return kind;
    }

    public String getSourceHandle() {
        return sourceHandle;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDelta() {
        return delta;
    }

    public LocalDate getRecorded() {
        return recorded;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

}
