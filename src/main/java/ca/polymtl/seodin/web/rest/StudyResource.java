package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.repository.*;
import ca.polymtl.seodin.service.dto.StudyDTO;
import com.codahale.metrics.annotation.Timed;
import ca.polymtl.seodin.domain.Study;

import ca.polymtl.seodin.repository.search.StudySearchRepository;
import ca.polymtl.seodin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Study.
 */
@RestController
@RequestMapping("/api")
public class StudyResource {

    private final Logger log = LoggerFactory.getLogger(StudyResource.class);

    private static final String ENTITY_NAME = "study";

    private final StudyRepository studyRepository;

    private final StudySearchRepository studySearchRepository;

    private final DeveloperRepository developerRepository;
    private final SoftwareSystemRepository softwareSystemRepository;
    private final InterviewRepository interviewRepository;
    private final ThinkAloudRepository thinkAloudRepository;
    private final DiaryRepository diaryRepository;
    private final DefectRepository defectRepository;
    private final TestCaseRepository testCaseRepository;
    private final InteractiveLogRepository interactiveLogRepository;
    private final SourceCodeRepository sourceCodeRepository;
    private final DesignPatternRepository designPatternRepository;
    private final NoteRepository noteRepository;
    private final ScriptRepository scriptRepository;
    private final AudioRepository audioRepository;
    private final VideoRepository videoRepository;
    private final TaskRepository taskRepository;

    public StudyResource(StudyRepository studyRepository, StudySearchRepository studySearchRepository, DeveloperRepository developerRepository, SoftwareSystemRepository softwareSystemRepository, InterviewRepository interviewRepository, ThinkAloudRepository thinkAloudRepository, DiaryRepository diaryRepository, DefectRepository defectRepository, TestCaseRepository testCaseRepository, InteractiveLogRepository interactiveLogRepository, SourceCodeRepository sourceCodeRepository, DesignPatternRepository designPatternRepository, NoteRepository noteRepository, ScriptRepository scriptRepository, AudioRepository audioRepository, VideoRepository videoRepository, TaskRepository taskRepository) {
        this.studyRepository = studyRepository;
        this.studySearchRepository = studySearchRepository;
        this.developerRepository = developerRepository;
        this.softwareSystemRepository = softwareSystemRepository;
        this.interviewRepository = interviewRepository;
        this.thinkAloudRepository = thinkAloudRepository;
        this.diaryRepository = diaryRepository;
        this.defectRepository = defectRepository;
        this.testCaseRepository = testCaseRepository;
        this.interactiveLogRepository = interactiveLogRepository;
        this.sourceCodeRepository = sourceCodeRepository;
        this.designPatternRepository = designPatternRepository;
        this.noteRepository = noteRepository;
        this.scriptRepository = scriptRepository;
        this.audioRepository = audioRepository;
        this.videoRepository = videoRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * POST  /studies : Create a new study.
     *
     * @param study the study to create
     * @return the ResponseEntity with status 201 (Created) and with body the new study, or with status 400 (Bad Request) if the study has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/studies")
    @Timed
    public ResponseEntity<Study> createStudy(@Valid @RequestBody Study study) throws URISyntaxException {
        log.debug("REST request to save Study : {}", study);
        if (study.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new study cannot already have an ID")).body(null);
        }
        Study result = studyRepository.save(study);
        studySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/studies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /studies : Updates an existing study.
     *
     * @param study the study to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated study,
     * or with status 400 (Bad Request) if the study is not valid,
     * or with status 500 (Internal Server Error) if the study couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/studies")
    @Timed
    public ResponseEntity<Study> updateStudy(@Valid @RequestBody Study study) throws URISyntaxException {
        log.debug("REST request to update Study : {}", study);
        if (study.getId() == null) {
            return createStudy(study);
        }
        Study result = studyRepository.save(study);
        studySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, study.getId().toString()))
            .body(result);
    }

    /**
     * GET  /studies : get all the studies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studies in body
     */
    @GetMapping("/studies")
    @Timed
    public List<Study> getAllStudies() {
        log.debug("REST request to get all Studies");
        return studyRepository.findAll();
    }

    /**
     * GET  /studies/:id : get the "id" study.
     *
     * @param id the id of the study to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the study, or with status 404 (Not Found)
     */
    @GetMapping("/studies/{id}")
    @Timed
    public ResponseEntity<Study> getStudy(@PathVariable Long id) {
        log.debug("REST request to get Study : {}", id);
        Study study = studyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(study));
    }

    /**
     * EXPORT  /studies/:id/export : export the "id" study.
     *
     * @param id the id of the study to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the study, or with status 404 (Not Found)
     */
    @GetMapping("/studies/{id}/export")
    @Timed
    public ResponseEntity<StudyDTO> exportStudy(@PathVariable Long id) {
        log.debug("REST request to export Study : {}", id);
        Study study = studyRepository.findOne(id);
        StudyDTO studyDTO = new StudyDTO(study, developerRepository, softwareSystemRepository, interviewRepository, thinkAloudRepository, diaryRepository, defectRepository, testCaseRepository, interactiveLogRepository, sourceCodeRepository, designPatternRepository, taskRepository, noteRepository, scriptRepository, audioRepository, videoRepository);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(studyDTO));
    }

    /**
     * DELETE  /studies/:id : delete the "id" study.
     *
     * @param id the id of the study to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/studies/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudy(@PathVariable Long id) {
        log.debug("REST request to delete Study : {}", id);
        studyRepository.delete(id);
        studySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/studies?query=:query : search for the study corresponding
     * to the query.
     *
     * @param query the query of the study search
     * @return the result of the search
     */
    @GetMapping("/_search/studies")
    @Timed
    public List<Study> searchStudies(@RequestParam String query) {
        log.debug("REST request to search Studies for query {}", query);
        return StreamSupport
            .stream(studySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
