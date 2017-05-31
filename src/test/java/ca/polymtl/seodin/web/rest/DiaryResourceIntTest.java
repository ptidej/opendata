package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.Diary;
import ca.polymtl.seodin.repository.DiaryRepository;
import ca.polymtl.seodin.repository.search.DiarySearchRepository;
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

import ca.polymtl.seodin.domain.enumeration.ArtifactStatus;
/**
 * Test class for the DiaryResource REST controller.
 *
 * @see DiaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class DiaryResourceIntTest {

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_REGISTRED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REGISTRED = LocalDate.now(ZoneId.systemDefault());

    private static final ArtifactStatus DEFAULT_STATUS = ArtifactStatus.PRIVATE;
    private static final ArtifactStatus UPDATED_STATUS = ArtifactStatus.SUBMITED;

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private DiarySearchRepository diarySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiaryMockMvc;

    private Diary diary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DiaryResource diaryResource = new DiaryResource(diaryRepository, diarySearchRepository);
        this.restDiaryMockMvc = MockMvcBuilders.standaloneSetup(diaryResource)
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
    public static Diary createEntity(EntityManager em) {
        Diary diary = new Diary()
            .uri(DEFAULT_URI)
            .registred(DEFAULT_REGISTRED)
            .status(DEFAULT_STATUS);
        return diary;
    }

    @Before
    public void initTest() {
        diarySearchRepository.deleteAll();
        diary = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiary() throws Exception {
        int databaseSizeBeforeCreate = diaryRepository.findAll().size();

        // Create the Diary
        restDiaryMockMvc.perform(post("/api/diaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diary)))
            .andExpect(status().isCreated());

        // Validate the Diary in the database
        List<Diary> diaryList = diaryRepository.findAll();
        assertThat(diaryList).hasSize(databaseSizeBeforeCreate + 1);
        Diary testDiary = diaryList.get(diaryList.size() - 1);
        assertThat(testDiary.getUri()).isEqualTo(DEFAULT_URI);
        assertThat(testDiary.getRegistred()).isEqualTo(DEFAULT_REGISTRED);
        assertThat(testDiary.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the Diary in Elasticsearch
        Diary diaryEs = diarySearchRepository.findOne(testDiary.getId());
        assertThat(diaryEs).isEqualToComparingFieldByField(testDiary);
    }

    @Test
    @Transactional
    public void createDiaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diaryRepository.findAll().size();

        // Create the Diary with an existing ID
        diary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiaryMockMvc.perform(post("/api/diaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diary)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Diary> diaryList = diaryRepository.findAll();
        assertThat(diaryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDiaries() throws Exception {
        // Initialize the database
        diaryRepository.saveAndFlush(diary);

        // Get all the diaryList
        restDiaryMockMvc.perform(get("/api/diaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diary.getId().intValue())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].registred").value(hasItem(DEFAULT_REGISTRED.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDiary() throws Exception {
        // Initialize the database
        diaryRepository.saveAndFlush(diary);

        // Get the diary
        restDiaryMockMvc.perform(get("/api/diaries/{id}", diary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diary.getId().intValue()))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()))
            .andExpect(jsonPath("$.registred").value(DEFAULT_REGISTRED.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDiary() throws Exception {
        // Get the diary
        restDiaryMockMvc.perform(get("/api/diaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiary() throws Exception {
        // Initialize the database
        diaryRepository.saveAndFlush(diary);
        diarySearchRepository.save(diary);
        int databaseSizeBeforeUpdate = diaryRepository.findAll().size();

        // Update the diary
        Diary updatedDiary = diaryRepository.findOne(diary.getId());
        updatedDiary
            .uri(UPDATED_URI)
            .registred(UPDATED_REGISTRED)
            .status(UPDATED_STATUS);

        restDiaryMockMvc.perform(put("/api/diaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiary)))
            .andExpect(status().isOk());

        // Validate the Diary in the database
        List<Diary> diaryList = diaryRepository.findAll();
        assertThat(diaryList).hasSize(databaseSizeBeforeUpdate);
        Diary testDiary = diaryList.get(diaryList.size() - 1);
        assertThat(testDiary.getUri()).isEqualTo(UPDATED_URI);
        assertThat(testDiary.getRegistred()).isEqualTo(UPDATED_REGISTRED);
        assertThat(testDiary.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the Diary in Elasticsearch
        Diary diaryEs = diarySearchRepository.findOne(testDiary.getId());
        assertThat(diaryEs).isEqualToComparingFieldByField(testDiary);
    }

    @Test
    @Transactional
    public void updateNonExistingDiary() throws Exception {
        int databaseSizeBeforeUpdate = diaryRepository.findAll().size();

        // Create the Diary

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDiaryMockMvc.perform(put("/api/diaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diary)))
            .andExpect(status().isCreated());

        // Validate the Diary in the database
        List<Diary> diaryList = diaryRepository.findAll();
        assertThat(diaryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDiary() throws Exception {
        // Initialize the database
        diaryRepository.saveAndFlush(diary);
        diarySearchRepository.save(diary);
        int databaseSizeBeforeDelete = diaryRepository.findAll().size();

        // Get the diary
        restDiaryMockMvc.perform(delete("/api/diaries/{id}", diary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean diaryExistsInEs = diarySearchRepository.exists(diary.getId());
        assertThat(diaryExistsInEs).isFalse();

        // Validate the database is empty
        List<Diary> diaryList = diaryRepository.findAll();
        assertThat(diaryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDiary() throws Exception {
        // Initialize the database
        diaryRepository.saveAndFlush(diary);
        diarySearchRepository.save(diary);

        // Search the diary
        restDiaryMockMvc.perform(get("/api/_search/diaries?query=id:" + diary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diary.getId().intValue())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].registred").value(hasItem(DEFAULT_REGISTRED.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diary.class);
        Diary diary1 = new Diary();
        diary1.setId(1L);
        Diary diary2 = new Diary();
        diary2.setId(diary1.getId());
        assertThat(diary1).isEqualTo(diary2);
        diary2.setId(2L);
        assertThat(diary1).isNotEqualTo(diary2);
        diary1.setId(null);
        assertThat(diary1).isNotEqualTo(diary2);
    }
}
