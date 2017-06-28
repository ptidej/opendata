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
 * A SoftwareSystem.
 */
@Entity
@Table(name = "software_system")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "softwaresystem")
public class SoftwareSystem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @OneToMany(mappedBy = "softwareSystem")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SourceCode> sourceCodes = new HashSet<>();

    @OneToMany(mappedBy = "softwareSystem")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Diary> diaries = new HashSet<>();

    @OneToMany(mappedBy = "softwareSystem")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestCase> testCases = new HashSet<>();

    @OneToMany(mappedBy = "softwareSystem")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ThinkAloud> thinkAlouds = new HashSet<>();

    @ManyToOne
    private Study study;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public SoftwareSystem tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Set<SourceCode> getSourceCodes() {
        return sourceCodes;
    }

    public SoftwareSystem sourceCodes(Set<SourceCode> sourceCodes) {
        this.sourceCodes = sourceCodes;
        return this;
    }

    public SoftwareSystem addSourceCode(SourceCode sourceCode) {
        this.sourceCodes.add(sourceCode);
        sourceCode.setSoftwareSystem(this);
        return this;
    }

    public SoftwareSystem removeSourceCode(SourceCode sourceCode) {
        this.sourceCodes.remove(sourceCode);
        sourceCode.setSoftwareSystem(null);
        return this;
    }

    public void setSourceCodes(Set<SourceCode> sourceCodes) {
        this.sourceCodes = sourceCodes;
    }

    public Set<Diary> getDiaries() {
        return diaries;
    }

    public SoftwareSystem diaries(Set<Diary> diaries) {
        this.diaries = diaries;
        return this;
    }

    public SoftwareSystem addDiary(Diary diary) {
        this.diaries.add(diary);
        diary.setSoftwareSystem(this);
        return this;
    }

    public SoftwareSystem removeDiary(Diary diary) {
        this.diaries.remove(diary);
        diary.setSoftwareSystem(null);
        return this;
    }

    public void setDiaries(Set<Diary> diaries) {
        this.diaries = diaries;
    }

    public Set<TestCase> getTestCases() {
        return testCases;
    }

    public SoftwareSystem testCases(Set<TestCase> testCases) {
        this.testCases = testCases;
        return this;
    }

    public SoftwareSystem addTestCase(TestCase testCase) {
        this.testCases.add(testCase);
        testCase.setSoftwareSystem(this);
        return this;
    }

    public SoftwareSystem removeTestCase(TestCase testCase) {
        this.testCases.remove(testCase);
        testCase.setSoftwareSystem(null);
        return this;
    }

    public void setTestCases(Set<TestCase> testCases) {
        this.testCases = testCases;
    }

    public Set<ThinkAloud> getThinkAlouds() {
        return thinkAlouds;
    }

    public SoftwareSystem thinkAlouds(Set<ThinkAloud> thinkAlouds) {
        this.thinkAlouds = thinkAlouds;
        return this;
    }

    public SoftwareSystem addThinkAloud(ThinkAloud thinkAloud) {
        this.thinkAlouds.add(thinkAloud);
        thinkAloud.setSoftwareSystem(this);
        return this;
    }

    public SoftwareSystem removeThinkAloud(ThinkAloud thinkAloud) {
        this.thinkAlouds.remove(thinkAloud);
        thinkAloud.setSoftwareSystem(null);
        return this;
    }

    public void setThinkAlouds(Set<ThinkAloud> thinkAlouds) {
        this.thinkAlouds = thinkAlouds;
    }

    public Study getStudy() {
        return study;
    }

    public SoftwareSystem study(Study study) {
        this.study = study;
        return this;
    }

    public void setStudy(Study study) {
        this.study = study;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SoftwareSystem softwareSystem = (SoftwareSystem) o;
        if (softwareSystem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), softwareSystem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SoftwareSystem{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            "}";
    }
}
