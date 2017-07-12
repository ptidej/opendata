import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { InterviewPopupService } from '../../entities/interview/interview-popup.service';

import { Video } from '../../entities/video/video.model';
import { VideoService } from '../../entities/video/video.service';
import { Audio } from '../../entities/audio/audio.model';
import { AudioService } from '../../entities/audio/audio.service';
import { Note } from '../../entities/note/note.model';
import { NoteService } from '../../entities/note/note.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-interview-search-dialog',
    templateUrl: './interview-search-dialog.component.html'
})
export class InterviewSearchDialogComponent implements OnInit, OnDestroy {

    videos: Video[];
    audios: Audio[];
    notes: Note[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    expandvideo: Boolean;
    expandaudio: Boolean;
    expandnote: Boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private videoService: VideoService,
        private audioService: AudioService,
        private noteService: NoteService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) { }

    loadAllVideos() {
        if (this.currentSearch) {
            this.videoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.videos = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.videoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.videos = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAllAudios() {
        if (this.currentSearch) {
            this.audioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.audios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.audioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.audios = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAllNotes() {
        if (this.currentSearch) {
            this.noteService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.notes = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.noteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notes = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    ngOnInit() {
        this.expandvideo = true;
        this.expandaudio = false;
        this.expandnote = false;
        this.loadAllVideos();
        this.loadAllAudios();
        this.loadAllNotes();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVideos();
        this.registerChangeInAudios();
        this.registerChangeInNotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Video) {
        return item.id;
    }

    registerChangeInVideos() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', (response) => this.loadAllVideos());
    }

    registerChangeInAudios() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', (response) => this.loadAllAudios());
    }

    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', (response) => this.loadAllNotes());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    expandVideos() {
        this.expandvideo = true;
        this.expandaudio = false;
        this.expandnote = false;
    }

    expandAudios() {
        this.expandvideo = false;
        this.expandaudio = true;
        this.expandnote = false;
    }

    expandNotes() {
        this.expandvideo = false;
        this.expandaudio = false;
        this.expandnote = true;
    }
}

@Component({
    selector: 'jhi-interview-search-popup',
    template: ''
})
export class InterviewSearchPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewPopupService: InterviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.interviewPopupService
                .open(InterviewSearchDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
