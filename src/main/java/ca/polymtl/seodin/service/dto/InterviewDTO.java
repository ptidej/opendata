package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.Audio;
import ca.polymtl.seodin.domain.Interview;
import ca.polymtl.seodin.domain.Note;
import ca.polymtl.seodin.domain.Video;
import ca.polymtl.seodin.repository.AudioRepository;
import ca.polymtl.seodin.repository.NoteRepository;
import ca.polymtl.seodin.repository.VideoRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO representing a Study, with all its details.
 */
public class InterviewDTO {

    private Long id;

    private String tag;

    private String description;

    AudioRepository audioRepository;
    List<Audio> audios;
    AudioDTO audioDTO;
    Set<AudioDTO> audioDTOS = new HashSet<AudioDTO>();

    VideoRepository videoRepository;
    List<Video> videos;
    VideoDTO videoDTO;
    Set<VideoDTO> videoDTOS = new HashSet<VideoDTO>();

    NoteRepository noteRepository;
    List<Note> notes;
    NoteDTO noteDTO;
    Set<NoteDTO> noteDTOS = new HashSet<NoteDTO>();

    public InterviewDTO() {
        // Empty constructor needed for Jackson.
    }

    public InterviewDTO(Interview interview, AudioRepository audioRepository, VideoRepository videoRepository, NoteRepository noteRepository) {
        this.id= interview.getId();
        this.tag = interview.getTag();
        this.description = interview.getDescription();
        this.audioRepository = audioRepository;
        this.videoRepository = videoRepository;
        this.noteRepository = noteRepository;
    }

    public Long getId() {
        return id;
    }

    public String getTag() {
        return tag;
    }

    public String getDescription() {
        return description;
    }


    public Set<AudioDTO> getAudios() {
        audios = audioRepository.findAllByInterviewTag(tag);
        for (Audio audio:audios){
            audioDTO = new AudioDTO(audio);
            audioDTOS.add(audioDTO);
        }
        return audioDTOS;
    }

    public Set<VideoDTO> getVideos() {
        videos = videoRepository.findAllByInterviewTag(tag);
        for (Video video:videos){
            videoDTO = new VideoDTO(video);
            videoDTOS.add(videoDTO);
        }
        return videoDTOS;
    }

    public Set<NoteDTO> getNotes() {
        notes = noteRepository.findAllByInterviewTag(tag);
        for (Note note:notes){
            noteDTO = new NoteDTO(note);
            noteDTOS.add(noteDTO);
        }
        return noteDTOS;
    }
}
