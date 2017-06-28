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
 * A Video.
 */
@Entity
@Table(name = "video")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "video")
public class Video implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "uri")
    private String uri;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @Column(name = "recorded")
    private LocalDate recorded;

    @ManyToOne
    private Interview interview;

    @ManyToOne
    private ThinkAloud thinkaloud;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public Video tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public Video description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return duration;
    }

    public Video duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getUri() {
        return uri;
    }

    public Video uri(String uri) {
        this.uri = uri;
        return this;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public Video status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    public LocalDate getRecorded() {
        return recorded;
    }

    public Video recorded(LocalDate recorded) {
        this.recorded = recorded;
        return this;
    }

    public void setRecorded(LocalDate recorded) {
        this.recorded = recorded;
    }

    public Interview getInterview() {
        return interview;
    }

    public Video interview(Interview interview) {
        this.interview = interview;
        return this;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
    }

    public ThinkAloud getThinkaloud() {
        return thinkaloud;
    }

    public Video thinkaloud(ThinkAloud thinkAloud) {
        this.thinkaloud = thinkAloud;
        return this;
    }

    public void setThinkaloud(ThinkAloud thinkAloud) {
        this.thinkaloud = thinkAloud;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Video video = (Video) o;
        if (video.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), video.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Video{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", description='" + getDescription() + "'" +
            ", duration='" + getDuration() + "'" +
            ", uri='" + getUri() + "'" +
            ", status='" + getStatus() + "'" +
            ", recorded='" + getRecorded() + "'" +
            "}";
    }
}
