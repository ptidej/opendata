package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.Audio;
import ca.polymtl.seodin.repository.AudioRepository;
import ca.polymtl.seodin.repository.search.AudioSearchRepository;
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
 * Test class for the AudioResource REST controller.
 *
 * @see AudioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class AudioResourceIntTest {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    private static final ArtifactStatus DEFAULT_STATUS = ArtifactStatus.PRIVATE;
    private static final ArtifactStatus UPDATED_STATUS = ArtifactStatus.SUBMITED;

    @Autowired
    private AudioRepository audioRepository;

    @Autowired
    private AudioSearchRepository audioSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAudioMockMvc;

    private Audio audio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AudioResource audioResource = new AudioResource(audioRepository, audioSearchRepository);
        this.restAudioMockMvc = MockMvcBuilders.standaloneSetup(audioResource)
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
    public static Audio createEntity(EntityManager em) {
        Audio audio = new Audio()
            .tag(DEFAULT_TAG)
            .description(DEFAULT_DESCRIPTION)
            .duration(DEFAULT_DURATION)
            .uri(DEFAULT_URI)
            .status(DEFAULT_STATUS);
        return audio;
    }

    @Before
    public void initTest() {
        audioSearchRepository.deleteAll();
        audio = createEntity(em);
    }

    @Test
    @Transactional
    public void createAudio() throws Exception {
        int databaseSizeBeforeCreate = audioRepository.findAll().size();

        // Create the Audio
        restAudioMockMvc.perform(post("/api/audios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audio)))
            .andExpect(status().isCreated());

        // Validate the Audio in the database
        List<Audio> audioList = audioRepository.findAll();
        assertThat(audioList).hasSize(databaseSizeBeforeCreate + 1);
        Audio testAudio = audioList.get(audioList.size() - 1);
        assertThat(testAudio.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testAudio.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAudio.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testAudio.getUri()).isEqualTo(DEFAULT_URI);
        assertThat(testAudio.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the Audio in Elasticsearch
        Audio audioEs = audioSearchRepository.findOne(testAudio.getId());
        assertThat(audioEs).isEqualToComparingFieldByField(testAudio);
    }

    @Test
    @Transactional
    public void createAudioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = audioRepository.findAll().size();

        // Create the Audio with an existing ID
        audio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAudioMockMvc.perform(post("/api/audios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audio)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Audio> audioList = audioRepository.findAll();
        assertThat(audioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAudios() throws Exception {
        // Initialize the database
        audioRepository.saveAndFlush(audio);

        // Get all the audioList
        restAudioMockMvc.perform(get("/api/audios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(audio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getAudio() throws Exception {
        // Initialize the database
        audioRepository.saveAndFlush(audio);

        // Get the audio
        restAudioMockMvc.perform(get("/api/audios/{id}", audio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(audio.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAudio() throws Exception {
        // Get the audio
        restAudioMockMvc.perform(get("/api/audios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAudio() throws Exception {
        // Initialize the database
        audioRepository.saveAndFlush(audio);
        audioSearchRepository.save(audio);
        int databaseSizeBeforeUpdate = audioRepository.findAll().size();

        // Update the audio
        Audio updatedAudio = audioRepository.findOne(audio.getId());
        updatedAudio
            .tag(UPDATED_TAG)
            .description(UPDATED_DESCRIPTION)
            .duration(UPDATED_DURATION)
            .uri(UPDATED_URI)
            .status(UPDATED_STATUS);

        restAudioMockMvc.perform(put("/api/audios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAudio)))
            .andExpect(status().isOk());

        // Validate the Audio in the database
        List<Audio> audioList = audioRepository.findAll();
        assertThat(audioList).hasSize(databaseSizeBeforeUpdate);
        Audio testAudio = audioList.get(audioList.size() - 1);
        assertThat(testAudio.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testAudio.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAudio.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testAudio.getUri()).isEqualTo(UPDATED_URI);
        assertThat(testAudio.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the Audio in Elasticsearch
        Audio audioEs = audioSearchRepository.findOne(testAudio.getId());
        assertThat(audioEs).isEqualToComparingFieldByField(testAudio);
    }

    @Test
    @Transactional
    public void updateNonExistingAudio() throws Exception {
        int databaseSizeBeforeUpdate = audioRepository.findAll().size();

        // Create the Audio

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAudioMockMvc.perform(put("/api/audios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(audio)))
            .andExpect(status().isCreated());

        // Validate the Audio in the database
        List<Audio> audioList = audioRepository.findAll();
        assertThat(audioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAudio() throws Exception {
        // Initialize the database
        audioRepository.saveAndFlush(audio);
        audioSearchRepository.save(audio);
        int databaseSizeBeforeDelete = audioRepository.findAll().size();

        // Get the audio
        restAudioMockMvc.perform(delete("/api/audios/{id}", audio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean audioExistsInEs = audioSearchRepository.exists(audio.getId());
        assertThat(audioExistsInEs).isFalse();

        // Validate the database is empty
        List<Audio> audioList = audioRepository.findAll();
        assertThat(audioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAudio() throws Exception {
        // Initialize the database
        audioRepository.saveAndFlush(audio);
        audioSearchRepository.save(audio);

        // Search the audio
        restAudioMockMvc.perform(get("/api/_search/audios?query=id:" + audio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(audio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Audio.class);
        Audio audio1 = new Audio();
        audio1.setId(1L);
        Audio audio2 = new Audio();
        audio2.setId(audio1.getId());
        assertThat(audio1).isEqualTo(audio2);
        audio2.setId(2L);
        assertThat(audio1).isNotEqualTo(audio2);
        audio1.setId(null);
        assertThat(audio1).isNotEqualTo(audio2);
    }
}
