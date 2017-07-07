package ca.polymtl.seodin.service.dto;

import ca.polymtl.seodin.domain.*;
import ca.polymtl.seodin.repository.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO representing a Study, with all its details.
 */
public class DeveloperDTO {

    private Long id;

    private String name;

    InterviewRepository interviewRepository;
    List<Interview> interviews;
    InterviewDTO interviewDTO;
    Set<InterviewDTO> interviewDTOS = new HashSet<InterviewDTO>();

    ThinkAloudRepository thinkAloudRepository;
    List<ThinkAloud> thinkAlouds;
    ThinkAloudDTO thinkAloudDTO;
    Set<ThinkAloudDTO> thinkAloudDTOS = new HashSet<ThinkAloudDTO>();

    DiaryRepository diaryRepository;
    List<Diary> diaries;
    DiaryDTO diaryDTO;
    Set<DiaryDTO> diaryDTOS = new HashSet<DiaryDTO>();

    DefectRepository defectRepository;
    List<Defect> defects;
    DefectDTO defectDTO;
    Set<DefectDTO> defectDTOS = new HashSet<DefectDTO>();

    TestCaseRepository testCaseRepository;
    List<TestCase> testCases;
    TestCaseDTO testCaseDTO;
    Set<TestCaseDTO> testCaseDTOS = new HashSet<TestCaseDTO>();

    InteractiveLogRepository interactiveLogRepository;
    List<InteractiveLog> interactiveLogs;
    InteractiveLogDTO interactiveLogDTO;
    Set<InteractiveLogDTO> interactiveLogDTOS = new HashSet<InteractiveLogDTO>();

    AudioRepository audioRepository;
    VideoRepository videoRepository;
    NoteRepository noteRepository;

    public DeveloperDTO() {
        // Empty constructor needed for Jackson.
    }

    public DeveloperDTO(Developer developer, InterviewRepository interviewRepository, ThinkAloudRepository thinkAloudRepository, DiaryRepository diaryRepository, DefectRepository defectRepository, TestCaseRepository testCaseRepository, InteractiveLogRepository interactiveLogRepository, AudioRepository audioRepository, VideoRepository videoRepository, NoteRepository noteRepository) {
        this.id= developer.getId();
        this.name = developer.getName();
        this.interviewRepository = interviewRepository;
        this.thinkAloudRepository = thinkAloudRepository;
        this.diaryRepository = diaryRepository;
        this.defectRepository = defectRepository;
        this.testCaseRepository = testCaseRepository;
        this.interactiveLogRepository = interactiveLogRepository;
        this.audioRepository = audioRepository;
        this.videoRepository = videoRepository;
        this.noteRepository = noteRepository;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<InterviewDTO> getInterviews() {
        interviews = interviewRepository.findAllByDeveloperName(name);
        for (Interview interview:interviews){
            interviewDTO = new InterviewDTO(interview, audioRepository, videoRepository, noteRepository);
            interviewDTOS.add(interviewDTO);
        }
        return interviewDTOS;
    }

    public Set<ThinkAloudDTO> getThinkAlouds() {
        thinkAlouds = thinkAloudRepository.findAllByDeveloperName(name);
        for (ThinkAloud thinkAloud:thinkAlouds){
            thinkAloudDTO = new ThinkAloudDTO(thinkAloud);
            thinkAloudDTOS.add(thinkAloudDTO);
        }
        return thinkAloudDTOS;
    }

    public Set<DiaryDTO> getDiaries() {
        diaries = diaryRepository.findAllByDeveloperName(name);
        for (Diary diary:diaries){
            diaryDTO = new DiaryDTO(diary);
            diaryDTOS.add(diaryDTO);
        }
        return diaryDTOS;
    }

    public Set<DefectDTO> getDefects() {
        defects = defectRepository.findAllByDeveloperName(name);
        for (Defect defect:defects){
            defectDTO = new DefectDTO(defect);
            defectDTOS.add(defectDTO);
        }
        return defectDTOS;
    }

    public Set<TestCaseDTO> getTestCases() {
        testCases = testCaseRepository.findAllByDeveloperName(name);
        for (TestCase testCase:testCases){
            testCaseDTO = new TestCaseDTO(testCase);
            testCaseDTOS.add(testCaseDTO);
        }
        return testCaseDTOS;
    }

    public Set<InteractiveLogDTO> getInteractiveLogs() {
        interactiveLogs = interactiveLogRepository.findAllByDeveloperName(name);
        for (InteractiveLog interactiveLog:interactiveLogs){
            interactiveLogDTO = new InteractiveLogDTO(interactiveLog);
            interactiveLogDTOS.add(interactiveLogDTO);
        }
        return interactiveLogDTOS;
    }
}
