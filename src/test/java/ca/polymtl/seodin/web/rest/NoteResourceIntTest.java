package ca.polymtl.seodin.web.rest;

import ca.polymtl.seodin.SeodinApp;

import ca.polymtl.seodin.domain.Note;
import ca.polymtl.seodin.repository.NoteRepository;
import ca.polymtl.seodin.repository.search.NoteSearchRepository;
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
 * Test class for the NoteResource REST controller.
 *
 * @see NoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeodinApp.class)
public class NoteResourceIntTest {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_URI = "AAAAAAAAAA";
    private static final String UPDATED_URI = "BBBBBBBBBB";

    private static final ArtifactStatus DEFAULT_STATUS = ArtifactStatus.PRIVATE;
    private static final ArtifactStatus UPDATED_STATUS = ArtifactStatus.SUBMITED;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NoteSearchRepository noteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNoteMockMvc;

    private Note note;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        NoteResource noteResource = new NoteResource(noteRepository, noteSearchRepository);
        this.restNoteMockMvc = MockMvcBuilders.standaloneSetup(noteResource)
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
    public static Note createEntity(EntityManager em) {
        Note note = new Note()
            .tag(DEFAULT_TAG)
            .description(DEFAULT_DESCRIPTION)
            .uri(DEFAULT_URI)
            .status(DEFAULT_STATUS);
        return note;
    }

    @Before
    public void initTest() {
        noteSearchRepository.deleteAll();
        note = createEntity(em);
    }

    @Test
    @Transactional
    public void createNote() throws Exception {
        int databaseSizeBeforeCreate = noteRepository.findAll().size();

        // Create the Note
        restNoteMockMvc.perform(post("/api/notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(note)))
            .andExpect(status().isCreated());

        // Validate the Note in the database
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList).hasSize(databaseSizeBeforeCreate + 1);
        Note testNote = noteList.get(noteList.size() - 1);
        assertThat(testNote.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testNote.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNote.getUri()).isEqualTo(DEFAULT_URI);
        assertThat(testNote.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the Note in Elasticsearch
        Note noteEs = noteSearchRepository.findOne(testNote.getId());
        assertThat(noteEs).isEqualToComparingFieldByField(testNote);
    }

    @Test
    @Transactional
    public void createNoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteRepository.findAll().size();

        // Create the Note with an existing ID
        note.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteMockMvc.perform(post("/api/notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(note)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotes() throws Exception {
        // Initialize the database
        noteRepository.saveAndFlush(note);

        // Get all the noteList
        restNoteMockMvc.perform(get("/api/notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(note.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getNote() throws Exception {
        // Initialize the database
        noteRepository.saveAndFlush(note);

        // Get the note
        restNoteMockMvc.perform(get("/api/notes/{id}", note.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(note.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.uri").value(DEFAULT_URI.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNote() throws Exception {
        // Get the note
        restNoteMockMvc.perform(get("/api/notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNote() throws Exception {
        // Initialize the database
        noteRepository.saveAndFlush(note);
        noteSearchRepository.save(note);
        int databaseSizeBeforeUpdate = noteRepository.findAll().size();

        // Update the note
        Note updatedNote = noteRepository.findOne(note.getId());
        updatedNote
            .tag(UPDATED_TAG)
            .description(UPDATED_DESCRIPTION)
            .uri(UPDATED_URI)
            .status(UPDATED_STATUS);

        restNoteMockMvc.perform(put("/api/notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNote)))
            .andExpect(status().isOk());

        // Validate the Note in the database
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList).hasSize(databaseSizeBeforeUpdate);
        Note testNote = noteList.get(noteList.size() - 1);
        assertThat(testNote.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testNote.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNote.getUri()).isEqualTo(UPDATED_URI);
        assertThat(testNote.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the Note in Elasticsearch
        Note noteEs = noteSearchRepository.findOne(testNote.getId());
        assertThat(noteEs).isEqualToComparingFieldByField(testNote);
    }

    @Test
    @Transactional
    public void updateNonExistingNote() throws Exception {
        int databaseSizeBeforeUpdate = noteRepository.findAll().size();

        // Create the Note

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNoteMockMvc.perform(put("/api/notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(note)))
            .andExpect(status().isCreated());

        // Validate the Note in the database
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNote() throws Exception {
        // Initialize the database
        noteRepository.saveAndFlush(note);
        noteSearchRepository.save(note);
        int databaseSizeBeforeDelete = noteRepository.findAll().size();

        // Get the note
        restNoteMockMvc.perform(delete("/api/notes/{id}", note.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean noteExistsInEs = noteSearchRepository.exists(note.getId());
        assertThat(noteExistsInEs).isFalse();

        // Validate the database is empty
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchNote() throws Exception {
        // Initialize the database
        noteRepository.saveAndFlush(note);
        noteSearchRepository.save(note);

        // Search the note
        restNoteMockMvc.perform(get("/api/_search/notes?query=id:" + note.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(note.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].uri").value(hasItem(DEFAULT_URI.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Note.class);
        Note note1 = new Note();
        note1.setId(1L);
        Note note2 = new Note();
        note2.setId(note1.getId());
        assertThat(note1).isEqualTo(note2);
        note2.setId(2L);
        assertThat(note1).isNotEqualTo(note2);
        note1.setId(null);
        assertThat(note1).isNotEqualTo(note2);
    }
}
