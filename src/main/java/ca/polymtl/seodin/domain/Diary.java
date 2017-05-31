package ca.polymtl.seodin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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

    @Column(name = "registred")
    private LocalDate registred;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @OneToOne
    @JoinColumn(unique = true)
    private Task task;

    @OneToOne
    @JoinColumn(unique = true)
    private SoftwareSystem softwareSystem;

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

    public LocalDate getRegistred() {
        return registred;
    }

    public Diary registred(LocalDate registred) {
        this.registred = registred;
        return this;
    }

    public void setRegistred(LocalDate registred) {
        this.registred = registred;
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
            ", registred='" + getRegistred() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
