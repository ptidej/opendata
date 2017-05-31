package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.InteractiveLog;
import ca.polymtl.seodin.repository.InteractiveLogRepository;
import ca.polymtl.seodin.repository.search.InteractiveLogSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ca.polymtl.seodin.domain.enumeration.LogKind;
import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
/**
 * Test class for the InteractiveLogResource REST controller.
 *
 * @see InteractiveLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class InteractiveLogResourceIntTest {

    private static final LogKind DEFAULT_KIND = LogKind.SELECTION;
    private static final LogKind UPDATED_KIND = LogKind.COMMAND;

    private static final String DEFAULT_SOURCE_HANDLE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_HANDLE = "BBBBBBBBBB";

    private static final String DEFAULT_ORIGIN = "AAAAAAAAAA";
    private static final String UPDATED_ORIGIN = "BBBBBBBBBB";

    private static final String DEFAULT_DELTA = "AAAAAAAAAA";
    private static final String UPDATED_DELTA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_REGISTRED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REGISTRED = LocalDate.now(ZoneId.systemDefault());

    private static final ArtifactStatus DEFAULT_STATUS = ArtifactStatus.PRIVATE;
    private static final ArtifactStatus UPDATED_STATUS = ArtifactStatus.SUBMITED;

    @Autowired
    private InteractiveLogRepository interactiveLogRepository;

    @Autowired
    private InteractiveLogSearchRepository interactiveLogSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInteractiveLogMockMvc;

    private InteractiveLog interactiveLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        InteractiveLogResource interactiveLogResource = new InteractiveLogResource(interactiveLogRepository, interactiveLogSearchRepository);
        this.restInteractiveLogMockMvc = MockMvcBuilders.standaloneSetup(interactiveLogResource)
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
    public static InteractiveLog createEntity(EntityManager em) {
        InteractiveLog interactiveLog = new InteractiveLog()
            .kind(DEFAULT_KIND)
            .sourceHandle(DEFAULT_SOURCE_HANDLE)
            .origin(DEFAULT_ORIGIN)
            .delta(DEFAULT_DELTA)
            .registred(DEFAULT_REGISTRED)
            .status(DEFAULT_STATUS);
        return interactiveLog;
    }

    @Before
    public void initTest() {
        interactiveLogSearchRepository.deleteAll();
        interactiveLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createInteractiveLog() throws Exception {
        int databaseSizeBeforeCreate = interactiveLogRepository.findAll().size();

        // Create the InteractiveLog
        restInteractiveLogMockMvc.perform(post("/api/interactive-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactiveLog)))
            .andExpect(status().isCreated());

        // Validate the InteractiveLog in the database
        List<InteractiveLog> interactiveLogList = interactiveLogRepository.findAll();
        assertThat(interactiveLogList).hasSize(databaseSizeBeforeCreate + 1);
        InteractiveLog testInteractiveLog = interactiveLogList.get(interactiveLogList.size() - 1);
        assertThat(testInteractiveLog.getKind()).isEqualTo(DEFAULT_KIND);
        assertThat(testInteractiveLog.getSourceHandle()).isEqualTo(DEFAULT_SOURCE_HANDLE);
        assertThat(testInteractiveLog.getOrigin()).isEqualTo(DEFAULT_ORIGIN);
        assertThat(testInteractiveLog.getDelta()).isEqualTo(DEFAULT_DELTA);
        assertThat(testInteractiveLog.getRegistred()).isEqualTo(DEFAULT_REGISTRED);
        assertThat(testInteractiveLog.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the InteractiveLog in Elasticsearch
        InteractiveLog interactiveLogEs = interactiveLogSearchRepository.findOne(testInteractiveLog.getId());
        assertThat(interactiveLogEs).isEqualToComparingFieldByField(testInteractiveLog);
    }

    @Test
    @Transactional
    public void createInteractiveLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interactiveLogRepository.findAll().size();

        // Create the InteractiveLog with an existing ID
        interactiveLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInteractiveLogMockMvc.perform(post("/api/interactive-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactiveLog)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<InteractiveLog> interactiveLogList = interactiveLogRepository.findAll();
        assertThat(interactiveLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInteractiveLogs() throws Exception {
        // Initialize the database
        interactiveLogRepository.saveAndFlush(interactiveLog);

        // Get all the interactiveLogList
        restInteractiveLogMockMvc.perform(get("/api/interactive-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interactiveLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].kind").value(hasItem(DEFAULT_KIND.toString())))
            .andExpect(jsonPath("$.[*].sourceHandle").value(hasItem(DEFAULT_SOURCE_HANDLE.toString())))
            .andExpect(jsonPath("$.[*].origin").value(hasItem(DEFAULT_ORIGIN.toString())))
            .andExpect(jsonPath("$.[*].delta").value(hasItem(DEFAULT_DELTA.toString())))
            .andExpect(jsonPath("$.[*].registred").value(hasItem(DEFAULT_REGISTRED.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getInteractiveLog() throws Exception {
        // Initialize the database
        interactiveLogRepository.saveAndFlush(interactiveLog);

        // Get the interactiveLog
        restInteractiveLogMockMvc.perform(get("/api/interactive-logs/{id}", interactiveLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interactiveLog.getId().intValue()))
            .andExpect(jsonPath("$.kind").value(DEFAULT_KIND.toString()))
            .andExpect(jsonPath("$.sourceHandle").value(DEFAULT_SOURCE_HANDLE.toString()))
            .andExpect(jsonPath("$.origin").value(DEFAULT_ORIGIN.toString()))
            .andExpect(jsonPath("$.delta").value(DEFAULT_DELTA.toString()))
            .andExpect(jsonPath("$.registred").value(DEFAULT_REGISTRED.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInteractiveLog() throws Exception {
        // Get the interactiveLog
        restInteractiveLogMockMvc.perform(get("/api/interactive-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInteractiveLog() throws Exception {
        // Initialize the database
        interactiveLogRepository.saveAndFlush(interactiveLog);
        interactiveLogSearchRepository.save(interactiveLog);
        int databaseSizeBeforeUpdate = interactiveLogRepository.findAll().size();

        // Update the interactiveLog
        InteractiveLog updatedInteractiveLog = interactiveLogRepository.findOne(interactiveLog.getId());
        updatedInteractiveLog
            .kind(UPDATED_KIND)
            .sourceHandle(UPDATED_SOURCE_HANDLE)
            .origin(UPDATED_ORIGIN)
            .delta(UPDATED_DELTA)
            .registred(UPDATED_REGISTRED)
            .status(UPDATED_STATUS);

        restInteractiveLogMockMvc.perform(put("/api/interactive-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInteractiveLog)))
            .andExpect(status().isOk());

        // Validate the InteractiveLog in the database
        List<InteractiveLog> interactiveLogList = interactiveLogRepository.findAll();
        assertThat(interactiveLogList).hasSize(databaseSizeBeforeUpdate);
        InteractiveLog testInteractiveLog = interactiveLogList.get(interactiveLogList.size() - 1);
        assertThat(testInteractiveLog.getKind()).isEqualTo(UPDATED_KIND);
        assertThat(testInteractiveLog.getSourceHandle()).isEqualTo(UPDATED_SOURCE_HANDLE);
        assertThat(testInteractiveLog.getOrigin()).isEqualTo(UPDATED_ORIGIN);
        assertThat(testInteractiveLog.getDelta()).isEqualTo(UPDATED_DELTA);
        assertThat(testInteractiveLog.getRegistred()).isEqualTo(UPDATED_REGISTRED);
        assertThat(testInteractiveLog.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the InteractiveLog in Elasticsearch
        InteractiveLog interactiveLogEs = interactiveLogSearchRepository.findOne(testInteractiveLog.getId());
        assertThat(interactiveLogEs).isEqualToComparingFieldByField(testInteractiveLog);
    }

    @Test
    @Transactional
    public void updateNonExistingInteractiveLog() throws Exception {
        int databaseSizeBeforeUpdate = interactiveLogRepository.findAll().size();

        // Create the InteractiveLog

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInteractiveLogMockMvc.perform(put("/api/interactive-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interactiveLog)))
            .andExpect(status().isCreated());

        // Validate the InteractiveLog in the database
        List<InteractiveLog> interactiveLogList = interactiveLogRepository.findAll();
        assertThat(interactiveLogList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInteractiveLog() throws Exception {
        // Initialize the database
        interactiveLogRepository.saveAndFlush(interactiveLog);
        interactiveLogSearchRepository.save(interactiveLog);
        int databaseSizeBeforeDelete = interactiveLogRepository.findAll().size();

        // Get the interactiveLog
        restInteractiveLogMockMvc.perform(delete("/api/interactive-logs/{id}", interactiveLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean interactiveLogExistsInEs = interactiveLogSearchRepository.exists(interactiveLog.getId());
        assertThat(interactiveLogExistsInEs).isFalse();

        // Validate the database is empty
        List<InteractiveLog> interactiveLogList = interactiveLogRepository.findAll();
        assertThat(interactiveLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchInteractiveLog() throws Exception {
        // Initialize the database
        interactiveLogRepository.saveAndFlush(interactiveLog);
        interactiveLogSearchRepository.save(interactiveLog);

        // Search the interactiveLog
        restInteractiveLogMockMvc.perform(get("/api/_search/interactive-logs?query=id:" + interactiveLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interactiveLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].kind").value(hasItem(DEFAULT_KIND.toString())))
            .andExpect(jsonPath("$.[*].sourceHandle").value(hasItem(DEFAULT_SOURCE_HANDLE.toString())))
            .andExpect(jsonPath("$.[*].origin").value(hasItem(DEFAULT_ORIGIN.toString())))
            .andExpect(jsonPath("$.[*].delta").value(hasItem(DEFAULT_DELTA.toString())))
            .andExpect(jsonPath("$.[*].registred").value(hasItem(DEFAULT_REGISTRED.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InteractiveLog.class);
        InteractiveLog interactiveLog1 = new InteractiveLog();
        interactiveLog1.setId(1L);
        InteractiveLog interactiveLog2 = new InteractiveLog();
        interactiveLog2.setId(interactiveLog1.getId());
        assertThat(interactiveLog1).isEqualTo(interactiveLog2);
        interactiveLog2.setId(2L);
        assertThat(interactiveLog1).isNotEqualTo(interactiveLog2);
        interactiveLog1.setId(null);
        assertThat(interactiveLog1).isNotEqualTo(interactiveLog2);
    }
}
