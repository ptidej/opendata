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
        private alertService: AlertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudies();
    }

    load(id) {
        this.studyService.find(id).subscribe((study) => {
            this.study = study;
        });

        this.loadDevelopers(id);
        this.loadSoftwareSystems(id);
        this.loadInterviews(id);
        this.loadThinkAlouds(id);
        this.loadVideos(id);
        this.loadAudios(id);
    }

    loadDevelopers(id) {
      this.developerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.developers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadSoftwareSystems(id) {
      this.softwareSystemService.query().subscribe(
            (res: ResponseWrapper) => {
                this.softwareSystems = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadInterviews(id) {
      this.interviewService.query().subscribe(
            (res: ResponseWrapper) => {
                this.interviews = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadThinkAlouds(id) {
      this.thinkAloudService.query().subscribe(
            (res: ResponseWrapper) => {
                this.thinkAlouds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadVideos(id) {
      this.videoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.videos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAudios(id) {
      this.audioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.audios = res.json;
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
}
