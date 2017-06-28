package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.Study;
import ca.polymtl.seodin.repository.*;
import ca.polymtl.seodin.repository.search.StudySearchRepository;
import ca.polymtl.seodin.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StudyResource REST controller.
 *
 * @see StudyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class StudyResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private SoftwareSystemRepository softwareSystemRepository;
    @Autowired
    private InterviewRepository interviewRepository;
    @Autowired
    private ThinkAloudRepository thinkAloudRepository;
    @Autowired
    private DiaryRepository diaryRepository;
    @Autowired
    private DefectRepository defectRepository;
    @Autowired
    private TestCaseRepository testCaseRepository;
    @Autowired
    private InteractiveLogRepository interactiveLogRepository;
    @Autowired
    private SourceCodeRepository sourceCodeRepository;
    @Autowired
    private DesignPatternRepository designPatternRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ScriptRepository scriptRepository;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private AudioRepository audioRepository;
    @Autowired
    private VideoRepository videoRepository;


    @Autowired
    private StudySearchRepository studySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudyMockMvc;

    private Study study;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        StudyResource studyResource = new StudyResource(studyRepository, studySearchRepository, developerRepository, softwareSystemRepository, interviewRepository, thinkAloudRepository, diaryRepository, defectRepository, testCaseRepository, interactiveLogRepository, sourceCodeRepository, designPatternRepository, noteRepository, scriptRepository, audioRepository, videoRepository, taskRepository);
        this.restStudyMockMvc = MockMvcBuilders.standaloneSetup(studyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Study createEntity(EntityManager em) {
        Study study = new Study()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .author(DEFAULT_AUTHOR);
        return study;
    }

    @Before
    public void initTest() {
        studySearchRepository.deleteAll();
        study = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudy() throws Exception {
        int databaseSizeBeforeCreate = studyRepository.findAll().size();

        // Create the Study
        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isCreated());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeCreate + 1);
        Study testStudy = studyList.get(studyList.size() - 1);
        assertThat(testStudy.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testStudy.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testStudy.getAuthor()).isEqualTo(DEFAULT_AUTHOR);

        // Validate the Study in Elasticsearch
        Study studyEs = studySearchRepository.findOne(testStudy.getId());
        assertThat(studyEs).isEqualToComparingFieldByField(testStudy);
    }

    @Test
    @Transactional
    public void createStudyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studyRepository.findAll().size();

        // Create the Study with an existing ID
        study.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = studyRepository.findAll().size();
        // set the field null
        study.setTitle(null);

        // Create the Study, which fails.

        restStudyMockMvc.perform(post("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isBadRequest());

        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudies() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);

        // Get all the studyList
        restStudyMockMvc.perform(get("/api/studies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(study.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())));
    }

    @Test
    @Transactional
    public void getStudy() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);

        // Get the study
        restStudyMockMvc.perform(get("/api/studies/{id}", study.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(study.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudy() throws Exception {
        // Get the study
        restStudyMockMvc.perform(get("/api/studies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudy() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);
        studySearchRepository.save(study);
        int databaseSizeBeforeUpdate = studyRepository.findAll().size();

        // Update the study
        Study updatedStudy = studyRepository.findOne(study.getId());
        updatedStudy
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .author(UPDATED_AUTHOR);

        restStudyMockMvc.perform(put("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudy)))
            .andExpect(status().isOk());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeUpdate);
        Study testStudy = studyList.get(studyList.size() - 1);
        assertThat(testStudy.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testStudy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testStudy.getAuthor()).isEqualTo(UPDATED_AUTHOR);

        // Validate the Study in Elasticsearch
        Study studyEs = studySearchRepository.findOne(testStudy.getId());
        assertThat(studyEs).isEqualToComparingFieldByField(testStudy);
    }

    @Test
    @Transactional
    public void updateNonExistingStudy() throws Exception {
        int databaseSizeBeforeUpdate = studyRepository.findAll().size();

        // Create the Study

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStudyMockMvc.perform(put("/api/studies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(study)))
            .andExpect(status().isCreated());

        // Validate the Study in the database
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStudy() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);
        studySearchRepository.save(study);
        int databaseSizeBeforeDelete = studyRepository.findAll().size();

        // Get the study
        restStudyMockMvc.perform(delete("/api/studies/{id}", study.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean studyExistsInEs = studySearchRepository.exists(study.getId());
        assertThat(studyExistsInEs).isFalse();

        // Validate the database is empty
        List<Study> studyList = studyRepository.findAll();
        assertThat(studyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStudy() throws Exception {
        // Initialize the database
        studyRepository.saveAndFlush(study);
        studySearchRepository.save(study);

        // Search the study
        restStudyMockMvc.perform(get("/api/_search/studies?query=id:" + study.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(study.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Study.class);
        Study study1 = new Study();
        study1.setId(1L);
        Study study2 = new Study();
        study2.setId(study1.getId());
        assertThat(study1).isEqualTo(study2);
        study2.setId(2L);
        assertThat(study1).isNotEqualTo(study2);
        study1.setId(null);
        assertThat(study1).isNotEqualTo(study2);
    }
}
