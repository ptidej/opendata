import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

import { Study } from '../../entities/study/study.model';
import { StudyService } from '../../entities/study/study.service';

import { Developer } from '../../entities/developer/developer.model';
import { DeveloperService } from '../../entities/developer/developer.service';

import { SoftwareSystem } from '../../entities/software-system/software-system.model';
import { SoftwareSystemService } from '../../entities/software-system/software-system.service';

import { Interview } from '../../entities/interview/interview.model';
import { InterviewService } from '../../entities/interview/interview.service';

import { ThinkAloud } from '../../entities/think-aloud/think-aloud.model';
import { ThinkAloudService } from '../../entities/think-aloud/think-aloud.service';

import { Video } from '../../entities/video/video.model';
import { VideoService } from '../../entities/video/video.service';

import { Audio } from '../../entities/audio/audio.model';
import { AudioService } from '../../entities/audio/audio.service';

import { Note } from '../../entities/note/note.model';
import { NoteService } from '../../entities/note/note.service';

@Component({
    selector: 'jhi-study-full',
    templateUrl: './study-full.component.html'
})
export class StudyFullComponent implements OnInit, OnDestroy {

    study: Study;
    developers: Developer[];
    softwareSystems: SoftwareSystem[];
    thinkAlouds: ThinkAloud[];
    videos: Video[];
    interviews: Interview[];
    audios: Audio[];
    notes: Note[];
    expandSoftwareSystems: Boolean;
    expandDevelopers: Boolean;
    expandInterviews: Boolean;
    expandThinkAlouds: Boolean;
    expandVideos: Boolean;
    expandAudios: Boolean;
    expandNotes: Boolean;
    expandDeveloper: Boolean;
    expandInterview: Boolean;
    expandThinkAloud: Boolean;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private studyService: StudyService,
        private developerService: DeveloperService,
        private softwareSystemService: SoftwareSystemService,
        private interviewService: InterviewService,
        private thinkAloudService: ThinkAloudService,
        private videoService: VideoService,
        private audioService: AudioService,
        private noteService: NoteService,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudies();
        this.expandSoftwareSystems = true;
        this.expandDevelopers = true;
        this.expandThinkAlouds = true;
        this.expandVideos = true;
        this.expandAudios = true;
        this.expandNotes = true;
        this.expandInterviews = true;
        this.expandDeveloper = true;
        this.expandInterview = true;
        this.expandThinkAloud = true;
    }

    load(id) {
        this.studyService.find(id).subscribe((study) => {
            this.study = study;
            this.loadDevelopers(study.title);
            this.loadSoftwareSystems(study.title);
        });
        this.loadThinkAlouds(id);
        this.loadInterviews(id);
        this.loadVideos(id);
        this.loadAudios(id);
        this.loadNotes(id);
    }

    loadDevelopers(id) {
      if (id) {
            this.developerService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.developers = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.developerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.developers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadSoftwareSystems(id) {
      if (id) {
            this.softwareSystemService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.softwareSystems = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.softwareSystemService.query().subscribe(
            (res: ResponseWrapper) => {
                this.softwareSystems = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadInterviews(id) {
        if (id) {
            this.interviewService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.interviews = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.interviewService.query().subscribe(
            (res: ResponseWrapper) => {
                this.interviews = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadThinkAlouds(id) {
      if (id) {
            this.thinkAloudService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.thinkAlouds = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.thinkAloudService.query().subscribe(
            (res: ResponseWrapper) => {
                this.thinkAlouds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadVideos(id) {
      if (id) {
            this.videoService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.videos = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.videoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.videos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAudios(id) {
      if (id) {
            this.audioService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.audios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.audioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.audios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadNotes(id) {
      if (id) {
            this.noteService.search({
                query: id,
                }).subscribe(
                    (res: ResponseWrapper) => this.notes = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.noteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studyListModification',
            (response) => this.load(this.study.id)
        );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    toggleDevelopers() {
        if (this.expandDevelopers) {
            this.expandDevelopers = false;
        } else {
            this.expandDevelopers = true;
        }
    }

    toggleSoftwareSystems() {
        if (this.expandSoftwareSystems) {
            this.expandSoftwareSystems = false;
        } else {
            this.expandSoftwareSystems = true;
        }
    }

    toggleInterviews(developerName) {
        this.loadInterviews(developerName);
        if (this.expandInterviews) {
            this.expandInterviews = false;
        } else {
            this.expandInterviews = true;
        }
    }

    toggleThinkAlouds(developerName) {
        this.loadThinkAlouds(developerName);
        if (this.expandThinkAlouds) {
            this.expandThinkAlouds = false;
        } else {
            this.expandThinkAlouds = true;
        }
    }

    toggleAudios(tag) {
        this.loadAudios(tag);
        if (this.expandAudios) {
            this.expandAudios = false;
        } else {
            this.expandAudios = true;
        }
    }

    toggleVideos(tag) {
        this.loadVideos(tag);
        if (this.expandVideos) {
            this.expandVideos = false;
        } else {
            this.expandVideos = true;
        }
    }

    toggleNotes(tag) {
        this.loadNotes(tag);
        if (this.expandNotes) {
            this.expandNotes = false;
        } else {
            this.expandNotes = true;
        }
    }

    expandCollapseDeveloper(developerName) {
        if (this.expandDeveloper) {
            this.expandDeveloper = false;
        } else {
            this.expandDeveloper = true;
        }
    }

    expandCollapseInterview(interviewTag) {
        if (this.expandInterview) {
            this.expandInterview = false;
        } else {
            this.expandInterview = true;
        }
    }

    expandCollapseThinkAloud(ThinkAloudTag) {
        if (this.expandThinkAloud) {
            this.expandThinkAloud = false;
        } else {
            this.expandThinkAloud = true;
        }
    }
}
