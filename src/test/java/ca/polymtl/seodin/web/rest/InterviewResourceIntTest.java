package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.Interview;
import ca.polymtl.seodin.repository.InterviewRepository;
import ca.polymtl.seodin.repository.search.InterviewSearchRepository;
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
 * Test class for the InterviewResource REST controller.
 *
 * @see InterviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class InterviewResourceIntTest {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private InterviewSearchRepository interviewSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInterviewMockMvc;

    private Interview interview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        InterviewResource interviewResource = new InterviewResource(interviewRepository, interviewSearchRepository);
        this.restInterviewMockMvc = MockMvcBuilders.standaloneSetup(interviewResource)
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
    public static Interview createEntity(EntityManager em) {
        Interview interview = new Interview()
            .tag(DEFAULT_TAG)
            .description(DEFAULT_DESCRIPTION);
        return interview;
    }

    @Before
    public void initTest() {
        interviewSearchRepository.deleteAll();
        interview = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterview() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isCreated());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate + 1);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testInterview.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Interview in Elasticsearch
        Interview interviewEs = interviewSearchRepository.findOne(testInterview.getId());
        assertThat(interviewEs).isEqualToComparingFieldByField(testInterview);
    }

    @Test
    @Transactional
    public void createInterviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview with an existing ID
        interview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInterviews() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get all the interviewList
        restInterviewMockMvc.perform(get("/api/interviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interview.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", interview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interview.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInterview() throws Exception {
        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);
        interviewSearchRepository.save(interview);
        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Update the interview
        Interview updatedInterview = interviewRepository.findOne(interview.getId());
        updatedInterview
            .tag(UPDATED_TAG)
            .description(UPDATED_DESCRIPTION);

        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterview)))
            .andExpect(status().isOk());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testInterview.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Interview in Elasticsearch
        Interview interviewEs = interviewSearchRepository.findOne(testInterview.getId());
        assertThat(interviewEs).isEqualToComparingFieldByField(testInterview);
    }

    @Test
    @Transactional
    public void updateNonExistingInterview() throws Exception {
        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Create the Interview

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isCreated());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);
        interviewSearchRepository.save(interview);
        int databaseSizeBeforeDelete = interviewRepository.findAll().size();

        // Get the interview
        restInterviewMockMvc.perform(delete("/api/interviews/{id}", interview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean interviewExistsInEs = interviewSearchRepository.exists(interview.getId());
        assertThat(interviewExistsInEs).isFalse();

        // Validate the database is empty
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);
        interviewSearchRepository.save(interview);

        // Search the interview
        restInterviewMockMvc.perform(get("/api/_search/interviews?query=id:" + interview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interview.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Interview.class);
        Interview interview1 = new Interview();
        interview1.setId(1L);
        Interview interview2 = new Interview();
        interview2.setId(interview1.getId());
        assertThat(interview1).isEqualTo(interview2);
        interview2.setId(2L);
        assertThat(interview1).isNotEqualTo(interview2);
        interview1.setId(null);
        assertThat(interview1).isNotEqualTo(interview2);
    }
}
