package ca.polymtl.seodin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ca.polymtl.seodin.domain.enumeration.LogKind;

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

/**
 * A InteractiveLog.
 */
@Entity
@Table(name = "interactive_log")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "interactivelog")
public class InteractiveLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "kind")
    private LogKind kind;

    @Column(name = "source_handle")
    private String sourceHandle;

    @Column(name = "origin")
    private String origin;

    @Column(name = "delta")
    private String delta;

    @Column(name = "registred")
    private LocalDate registred;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @ManyToOne
    private Developer developer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LogKind getKind() {
        return kind;
    }

    public InteractiveLog kind(LogKind kind) {
        this.kind = kind;
        return this;
    }

    public void setKind(LogKind kind) {
        this.kind = kind;
    }

    public String getSourceHandle() {
        return sourceHandle;
    }

    public InteractiveLog sourceHandle(String sourceHandle) {
        this.sourceHandle = sourceHandle;
        return this;
    }

    public void setSourceHandle(String sourceHandle) {
        this.sourceHandle = sourceHandle;
    }

    public String getOrigin() {
        return origin;
    }

    public InteractiveLog origin(String origin) {
        this.origin = origin;
        return this;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDelta() {
        return delta;
    }

    public InteractiveLog delta(String delta) {
        this.delta = delta;
        return this;
    }

    public void setDelta(String delta) {
        this.delta = delta;
    }

    public LocalDate getRegistred() {
        return registred;
    }

    public InteractiveLog registred(LocalDate registred) {
        this.registred = registred;
        return this;
    }

    public void setRegistred(LocalDate registred) {
        this.registred = registred;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public InteractiveLog status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public InteractiveLog developer(Developer developer) {
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
        InteractiveLog interactiveLog = (InteractiveLog) o;
        if (interactiveLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interactiveLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InteractiveLog{" +
            "id=" + getId() +
            ", kind='" + getKind() + "'" +
            ", sourceHandle='" + getSourceHandle() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", delta='" + getDelta() + "'" +
            ", registred='" + getRegistred() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
