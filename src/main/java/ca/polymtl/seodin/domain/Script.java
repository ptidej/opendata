package ca.polymtl.seodin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

/**
 * A Script.
 */
@Entity
@Table(name = "script")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "script")
public class Script implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "description")
    private String description;

    @Column(name = "source_code")
    private String sourceCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public Script tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public Script description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public Script sourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
        return this;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public Script status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Script script = (Script) o;
        if (script.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), script.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Script{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", description='" + getDescription() + "'" +
            ", sourceCode='" + getSourceCode() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
