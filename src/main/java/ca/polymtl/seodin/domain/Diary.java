package ca.polymtl.seodin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

/**
 * A Diary.
 */
@Entity
@Table(name = "diary")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "diary")
public class Diary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uri")
    private String uri;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @ManyToOne
    private SoftwareSystem softwareSystem;

    @ManyToOne
    private Task task;

    @ManyToOne
    private Developer developer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUri() {
        return uri;
    }

    public Diary uri(String uri) {
        this.uri = uri;
        return this;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public Diary status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    public SoftwareSystem getSoftwareSystem() {
        return softwareSystem;
    }

    public Diary softwareSystem(SoftwareSystem softwareSystem) {
        this.softwareSystem = softwareSystem;
        return this;
    }

    public void setSoftwareSystem(SoftwareSystem softwareSystem) {
        this.softwareSystem = softwareSystem;
    }

    public Task getTask() {
        return task;
    }

    public Diary task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public Diary developer(Developer developer) {
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
        Diary diary = (Diary) o;
        if (diary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Diary{" +
            "id=" + getId() +
            ", uri='" + getUri() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
