package ca.polymtl.seodin.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Interview.
 */
@Entity
@Table(name = "interview")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "interview")
public class Interview implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "interview")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Audio> audios = new HashSet<>();

    @OneToMany(mappedBy = "interview")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Video> videos = new HashSet<>();

    @OneToMany(mappedBy = "interview")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Note> notes = new HashSet<>();

    @ManyToOne
    private Developer developer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public Interview tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public Interview description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Audio> getAudios() {
        return audios;
    }

    public Interview audios(Set<Audio> audios) {
        this.audios = audios;
        return this;
    }

    public Interview addAudio(Audio audio) {
        this.audios.add(audio);
        audio.setInterview(this);
        return this;
    }

    public Interview removeAudio(Audio audio) {
        this.audios.remove(audio);
        audio.setInterview(null);
        return this;
    }

    public void setAudios(Set<Audio> audios) {
        this.audios = audios;
    }

    public Set<Video> getVideos() {
        return videos;
    }

    public Interview videos(Set<Video> videos) {
        this.videos = videos;
        return this;
    }

    public Interview addVideo(Video video) {
        this.videos.add(video);
        video.setInterview(this);
        return this;
    }

    public Interview removeVideo(Video video) {
        this.videos.remove(video);
        video.setInterview(null);
        return this;
    }

    public void setVideos(Set<Video> videos) {
        this.videos = videos;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Interview notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Interview addNote(Note note) {
        this.notes.add(note);
        note.setInterview(this);
        return this;
    }

    public Interview removeNote(Note note) {
        this.notes.remove(note);
        note.setInterview(null);
        return this;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public Interview developer(Developer developer) {
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
        Interview interview = (Interview) o;
        if (interview.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interview.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Interview{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
