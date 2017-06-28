package ca.polymtl.seodin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

import ca.polymtl.seodin.domain.enumeration.Resolution;

import ca.polymtl.seodin.domain.enumeration.Severity;

import ca.polymtl.seodin.domain.enumeration.Priority;

/**
 * A Defect.
 */
@Entity
@Table(name = "defect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "defect")
public class Defect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket")
    private String ticket;

    @Column(name = "summary")
    private String summary;

    @Lob
    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "resolution")
    private Resolution resolution;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity")
    private Severity severity;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @Column(name = "recorded")
    private LocalDate recorded;

    @Column(name = "modified")
    private LocalDate modified;

    @ManyToOne
    private Developer developer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicket() {
        return ticket;
    }

    public Defect ticket(String ticket) {
        this.ticket = ticket;
        return this;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public String getSummary() {
        return summary;
    }

    public Defect summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public Defect description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public Defect status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    public Resolution getResolution() {
        return resolution;
    }

    public Defect resolution(Resolution resolution) {
        this.resolution = resolution;
        return this;
    }

    public void setResolution(Resolution resolution) {
        this.resolution = resolution;
    }

    public Severity getSeverity() {
        return severity;
    }

    public Defect severity(Severity severity) {
        this.severity = severity;
        return this;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public Priority getPriority() {
        return priority;
    }

    public Defect priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getRecorded() {
        return recorded;
    }

    public Defect recorded(LocalDate recorded) {
        this.recorded = recorded;
        return this;
    }

    public void setRecorded(LocalDate recorded) {
        this.recorded = recorded;
    }

    public LocalDate getModified() {
        return modified;
    }

    public Defect modified(LocalDate modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(LocalDate modified) {
        this.modified = modified;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public Defect developer(Developer developer) {
        this.developer = developer;
        return this;
    }

    public void setDeveloper(Developer developer) {
        this.developer = developer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Defect defect = (Defect) o;
        if (defect.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), defect.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Defect{" +
            "id=" + getId() +
            ", ticket='" + getTicket() + "'" +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", resolution='" + getResolution() + "'" +
            ", severity='" + getSeverity() + "'" +
            ", priority='" + getPriority() + "'" +
            ", recorded='" + getRecorded() + "'" +
            ", modified='" + getModified() + "'" +
            "}";
    }
}
