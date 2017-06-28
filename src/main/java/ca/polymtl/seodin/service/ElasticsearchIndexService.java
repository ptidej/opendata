package ca.polymtl.seodin.service;

import com.codahale.metrics.annotation.Timed;
import ca.polymtl.seodin.domain.*;
import ca.polymtl.seodin.repository.*;
import ca.polymtl.seodin.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;

@Service
public class ElasticsearchIndexService {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final AudioRepository audioRepository;

    private final AudioSearchRepository audioSearchRepository;

    private final DefectRepository defectRepository;

    private final DefectSearchRepository defectSearchRepository;

    private final DesignPatternRepository designPatternRepository;

    private final DesignPatternSearchRepository designPatternSearchRepository;

    private final DeveloperRepository developerRepository;

    private final DeveloperSearchRepository developerSearchRepository;

    private final DiaryRepository diaryRepository;

    private final DiarySearchRepository diarySearchRepository;

    private final InteractiveLogRepository interactiveLogRepository;

    private final InteractiveLogSearchRepository interactiveLogSearchRepository;

    private final InterviewRepository interviewRepository;

    private final InterviewSearchRepository interviewSearchRepository;

    private final NoteRepository noteRepository;

    private final NoteSearchRepository noteSearchRepository;

    private final ScriptRepository scriptRepository;

    private final ScriptSearchRepository scriptSearchRepository;

    private final SoftwareSystemRepository softwareSystemRepository;

    private final SoftwareSystemSearchRepository softwareSystemSearchRepository;

    private final SourceCodeRepository sourceCodeRepository;

    private final SourceCodeSearchRepository sourceCodeSearchRepository;

    private final StudyRepository studyRepository;

    private final StudySearchRepository studySearchRepository;

    private final TaskRepository taskRepository;

    private final TaskSearchRepository taskSearchRepository;

    private final TestCaseRepository testCaseRepository;

    private final TestCaseSearchRepository testCaseSearchRepository;

    private final ThinkAloudRepository thinkAloudRepository;

    private final ThinkAloudSearchRepository thinkAloudSearchRepository;

    private final VideoRepository videoRepository;

    private final VideoSearchRepository videoSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        AudioRepository audioRepository,
        AudioSearchRepository audioSearchRepository,
        DefectRepository defectRepository,
        DefectSearchRepository defectSearchRepository,
        DesignPatternRepository designPatternRepository,
        DesignPatternSearchRepository designPatternSearchRepository,
        DeveloperRepository developerRepository,
        DeveloperSearchRepository developerSearchRepository,
        DiaryRepository diaryRepository,
        DiarySearchRepository diarySearchRepository,
        InteractiveLogRepository interactiveLogRepository,
        InteractiveLogSearchRepository interactiveLogSearchRepository,
        InterviewRepository interviewRepository,
        InterviewSearchRepository interviewSearchRepository,
        NoteRepository noteRepository,
        NoteSearchRepository noteSearchRepository,
        ScriptRepository scriptRepository,
        ScriptSearchRepository scriptSearchRepository,
        SoftwareSystemRepository softwareSystemRepository,
        SoftwareSystemSearchRepository softwareSystemSearchRepository,
        SourceCodeRepository sourceCodeRepository,
        SourceCodeSearchRepository sourceCodeSearchRepository,
        StudyRepository studyRepository,
        StudySearchRepository studySearchRepository,
        TaskRepository taskRepository,
        TaskSearchRepository taskSearchRepository,
        TestCaseRepository testCaseRepository,
        TestCaseSearchRepository testCaseSearchRepository,
        ThinkAloudRepository thinkAloudRepository,
        ThinkAloudSearchRepository thinkAloudSearchRepository,
        VideoRepository videoRepository,
        VideoSearchRepository videoSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.audioRepository = audioRepository;
        this.audioSearchRepository = audioSearchRepository;
        this.defectRepository = defectRepository;
        this.defectSearchRepository = defectSearchRepository;
        this.designPatternRepository = designPatternRepository;
        this.designPatternSearchRepository = designPatternSearchRepository;
        this.developerRepository = developerRepository;
        this.developerSearchRepository = developerSearchRepository;
        this.diaryRepository = diaryRepository;
        this.diarySearchRepository = diarySearchRepository;
        this.interactiveLogRepository = interactiveLogRepository;
        this.interactiveLogSearchRepository = interactiveLogSearchRepository;
        this.interviewRepository = interviewRepository;
        this.interviewSearchRepository = interviewSearchRepository;
        this.noteRepository = noteRepository;
        this.noteSearchRepository = noteSearchRepository;
        this.scriptRepository = scriptRepository;
        this.scriptSearchRepository = scriptSearchRepository;
        this.softwareSystemRepository = softwareSystemRepository;
        this.softwareSystemSearchRepository = softwareSystemSearchRepository;
        this.sourceCodeRepository = sourceCodeRepository;
        this.sourceCodeSearchRepository = sourceCodeSearchRepository;
        this.studyRepository = studyRepository;
        this.studySearchRepository = studySearchRepository;
        this.taskRepository = taskRepository;
        this.taskSearchRepository = taskSearchRepository;
        this.testCaseRepository = testCaseRepository;
        this.testCaseSearchRepository = testCaseSearchRepository;
        this.thinkAloudRepository = thinkAloudRepository;
        this.thinkAloudSearchRepository = thinkAloudSearchRepository;
        this.videoRepository = videoRepository;
        this.videoSearchRepository = videoSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    public void reindexAll() {
        reindexForClass(Audio.class, audioRepository, audioSearchRepository);
        reindexForClass(Defect.class, defectRepository, defectSearchRepository);
        reindexForClass(DesignPattern.class, designPatternRepository, designPatternSearchRepository);
        reindexForClass(Developer.class, developerRepository, developerSearchRepository);
        reindexForClass(Diary.class, diaryRepository, diarySearchRepository);
        reindexForClass(InteractiveLog.class, interactiveLogRepository, interactiveLogSearchRepository);
        reindexForClass(Interview.class, interviewRepository, interviewSearchRepository);
        reindexForClass(Note.class, noteRepository, noteSearchRepository);
        reindexForClass(Script.class, scriptRepository, scriptSearchRepository);
        reindexForClass(SoftwareSystem.class, softwareSystemRepository, softwareSystemSearchRepository);
        reindexForClass(SourceCode.class, sourceCodeRepository, sourceCodeSearchRepository);
        reindexForClass(Study.class, studyRepository, studySearchRepository);
        reindexForClass(Task.class, taskRepository, taskSearchRepository);
        reindexForClass(TestCase.class, testCaseRepository, testCaseSearchRepository);
        reindexForClass(ThinkAloud.class, thinkAloudRepository, thinkAloudSearchRepository);
        reindexForClass(Video.class, videoRepository, videoSearchRepository);
        reindexForClass(User.class, userRepository, userSearchRepository);

        log.info("Elasticsearch: Successfully performed reindexing");
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            try {
                Method m = jpaRepository.getClass().getMethod("findAllWithEagerRelationships");
                elasticsearchRepository.save((List<T>) m.invoke(jpaRepository));
            } catch (Exception e) {
                elasticsearchRepository.save(jpaRepository.findAll());
            }
        }
        log.info("Elasticsearch: Indexed all rows for " + entityClass.getSimpleName());
    }
}
