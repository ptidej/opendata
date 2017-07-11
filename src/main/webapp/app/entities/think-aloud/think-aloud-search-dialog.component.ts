import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ThinkAloudPopupService } from './think-aloud-popup.service';

import { Video } from '../../entities/video/video.model';
import { VideoService } from '../../entities/video/video.service';
import { Note } from '../../entities/note/note.model';
import { NoteService } from '../../entities/note/note.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-think-aloud-search-dialog',
    templateUrl: './think-aloud-search-dialog.component.html'
})
export class ThinkAloudSearchDialogComponent {

    videos: Video[];
    notes: Note[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    expandvideo: Boolean;
    expandnote: Boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private videoService: VideoService,
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
        this.expandnote = false;
        this.loadAllVideos();
        this.loadAllNotes();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVideos();
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

    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe('videoListModification', (response) => this.loadAllNotes());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    expandVideos() {
        this.expandvideo = true;
        this.expandnote = false;
    }

    expandNotes() {
        this.expandvideo = false;
        this.expandnote = true;
    }
}

@Component({
    selector: 'jhi-think-aloud-search-popup',
    template: ''
})
export class ThinkAloudSearchPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thinkAloudPopupService: ThinkAloudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.thinkAloudPopupService
                .open(ThinkAloudSearchDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
