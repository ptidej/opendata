package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.TestCase;
import ca.polymtl.seodin.repository.TestCaseRepository;
import ca.polymtl.seodin.repository.search.TestCaseSearchRepository;
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

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
/**
 * Test class for the TestCaseResource REST controller.
 *
 * @see TestCaseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class TestCaseResourceIntTest {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    private static final ArtifactStatus DEFAULT_STATUS = ArtifactStatus.PRIVATE;
    private static final ArtifactStatus UPDATED_STATUS = ArtifactStatus.SUBMITED;

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private TestCaseSearchRepository testCaseSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestCaseMockMvc;

    private TestCase testCase;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestCaseResource testCaseResource = new TestCaseResource(testCaseRepository, testCaseSearchRepository);
        this.restTestCaseMockMvc = MockMvcBuilders.standaloneSetup(testCaseResource)
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
    public static TestCase createEntity(EntityManager em) {
        TestCase testCase = new TestCase()
            .tag(DEFAULT_TAG)
            .uri(DEFAULT_URI)
            .status(DEFAULT_STATUS);
        return testCase;
    }

    @Before
    public void initTest() {
        testCaseSearchRepository.deleteAll();
        testCase = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestCase() throws Exception {
        int databaseSizeBeforeCreate = testCaseRepository.findAll().size();

        // Create the TestCase
        restTestCaseMockMvc.perform(post("/api/test-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCase)))
            .andExpect(status().isCreated());

        // Validate the TestCase in the database
        List<TestCase> testCaseList = testCaseRepository.findAll();
        assertThat(testCaseList).hasSize(databaseSizeBeforeCreate + 1);
        TestCase testTestCase = testCaseList.get(testCaseList.size() - 1);
        assertThat(testTestCase.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testTestCase.getUri()).isEqualTo(DEFAULT_URI);
        assertThat(testTestCase.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the TestCase in Elasticsearch
        TestCase testCaseEs = testCaseSearchRepository.findOne(testTestCase.getId());
        assertThat(testCaseEs).isEqualToComparingFieldByField(testTestCase);
    }

    @Test
    @Transactional
    public void createTestCaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testCaseRepository.findAll().size();

        // Create the TestCase with an existing ID
        testCase.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestCaseMockMvc.perform(post("/api/test-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCase)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestCase> testCaseList = testCaseRepository.findAll();
        assertThat(testCaseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestCases() throws Exception {
        // Initialize the database
        testCaseRepository.saveAndFlush(testCase);

        // Get all the testCaseList
        restTestCaseMockMvc.perform(get("/api/test-cases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getTestCase() throws Exception {
        // Initialize the database
        testCaseRepository.saveAndFlush(testCase);

        // Get the testCase
        restTestCaseMockMvc.perform(get("/api/test-cases/{id}", testCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testCase.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestCase() throws Exception {
        // Get the testCase
        restTestCaseMockMvc.perform(get("/api/test-cases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestCase() throws Exception {
        // Initialize the database
        testCaseRepository.saveAndFlush(testCase);
        testCaseSearchRepository.save(testCase);
        int databaseSizeBeforeUpdate = testCaseRepository.findAll().size();

        // Update the testCase
        TestCase updatedTestCase = testCaseRepository.findOne(testCase.getId());
        updatedTestCase
            .tag(UPDATED_TAG)
            .uri(UPDATED_URI)
            .status(UPDATED_STATUS);

        restTestCaseMockMvc.perform(put("/api/test-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestCase)))
            .andExpect(status().isOk());

        // Validate the TestCase in the database
        List<TestCase> testCaseList = testCaseRepository.findAll();
        assertThat(testCaseList).hasSize(databaseSizeBeforeUpdate);
        TestCase testTestCase = testCaseList.get(testCaseList.size() - 1);
        assertThat(testTestCase.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testTestCase.getUri()).isEqualTo(UPDATED_URI);
        assertThat(testTestCase.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the TestCase in Elasticsearch
        TestCase testCaseEs = testCaseSearchRepository.findOne(testTestCase.getId());
        assertThat(testCaseEs).isEqualToComparingFieldByField(testTestCase);
    }

    @Test
    @Transactional
    public void updateNonExistingTestCase() throws Exception {
        int databaseSizeBeforeUpdate = testCaseRepository.findAll().size();

        // Create the TestCase

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestCaseMockMvc.perform(put("/api/test-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testCase)))
            .andExpect(status().isCreated());

        // Validate the TestCase in the database
        List<TestCase> testCaseList = testCaseRepository.findAll();
        assertThat(testCaseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestCase() throws Exception {
        // Initialize the database
        testCaseRepository.saveAndFlush(testCase);
        testCaseSearchRepository.save(testCase);
        int databaseSizeBeforeDelete = testCaseRepository.findAll().size();

        // Get the testCase
        restTestCaseMockMvc.perform(delete("/api/test-cases/{id}", testCase.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean testCaseExistsInEs = testCaseSearchRepository.exists(testCase.getId());
        assertThat(testCaseExistsInEs).isFalse();

        // Validate the database is empty
        List<TestCase> testCaseList = testCaseRepository.findAll();
        assertThat(testCaseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTestCase() throws Exception {
        // Initialize the database
        testCaseRepository.saveAndFlush(testCase);
        testCaseSearchRepository.save(testCase);

        // Search the testCase
        restTestCaseMockMvc.perform(get("/api/_search/test-cases?query=id:" + testCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestCase.class);
        TestCase testCase1 = new TestCase();
        testCase1.setId(1L);
        TestCase testCase2 = new TestCase();
        testCase2.setId(testCase1.getId());
        assertThat(testCase1).isEqualTo(testCase2);
        testCase2.setId(2L);
        assertThat(testCase1).isNotEqualTo(testCase2);
        testCase1.setId(null);
        assertThat(testCase1).isNotEqualTo(testCase2);
    }
}
