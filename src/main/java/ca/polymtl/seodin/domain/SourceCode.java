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

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;

/**
 * A SourceCode.
 */
@Entity
@Table(name = "source_code")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "sourcecode")
public class SourceCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "uri")
    private String uri;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status;

    @OneToMany(mappedBy = "sourceCode")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DesignPattern> designPatterns = new HashSet<>();

    @ManyToOne
    private SoftwareSystem softwareSystem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public SourceCode tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getUri() {
        return uri;
    }

    public SourceCode uri(String uri) {
        this.uri = uri;
        return this;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public ArtifactStatus getStatus() {
        return status;
    }

    public SourceCode status(ArtifactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArtifactStatus status) {
        this.status = status;
    }

    public Set<DesignPattern> getDesignPatterns() {
        return designPatterns;
    }

    public SourceCode designPatterns(Set<DesignPattern> designPatterns) {
        this.designPatterns = designPatterns;
        return this;
    }

    public SourceCode addDesignPattern(DesignPattern designPattern) {
        this.designPatterns.add(designPattern);
        designPattern.setSourceCode(this);
        return this;
    }

    public SourceCode removeDesignPattern(DesignPattern designPattern) {
        this.designPatterns.remove(designPattern);
        designPattern.setSourceCode(null);
        return this;
    }

    public void setDesignPatterns(Set<DesignPattern> designPatterns) {
        this.designPatterns = designPatterns;
    }

    public SoftwareSystem getSoftwareSystem() {
        return softwareSystem;
    }

    public SourceCode softwareSystem(SoftwareSystem softwareSystem) {
        this.softwareSystem = softwareSystem;
        return this;
    }

    public void setSoftwareSystem(SoftwareSystem softwareSystem) {
        this.softwareSystem = softwareSystem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SourceCode sourceCode = (SourceCode) o;
        if (sourceCode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sourceCode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SourceCode{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", uri='" + getUri() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
