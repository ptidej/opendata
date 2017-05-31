import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Video } from './video.model';
import { VideoPopupService } from './video-popup.service';
import { VideoService } from './video.service';
import { Interview, InterviewService } from '../interview';
import { ThinkAloud, ThinkAloudService } from '../think-aloud';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-video-dialog',
    templateUrl: './video-dialog.component.html'
})
export class VideoDialogComponent implements OnInit {

    video: Video;
    authorities: any[];
    isSaving: boolean;

    interviews: Interview[];

    thinkalouds: ThinkAloud[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private videoService: VideoService,
        private interviewService: InterviewService,
        private thinkAloudService: ThinkAloudService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.interviewService.query()
            .subscribe((res: ResponseWrapper) => { this.interviews = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.thinkAloudService.query()
            .subscribe((res: ResponseWrapper) => { this.thinkalouds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.video.id !== undefined) {
            this.subscribeToSaveResponse(
                this.videoService.update(this.video), false);
        } else {
            this.subscribeToSaveResponse(
                this.videoService.create(this.video), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Video>, isCreated: boolean) {
        result.subscribe((res: Video) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Video, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.video.created'
            : 'seodinApp.video.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'videoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackInterviewById(index: number, item: Interview) {
        return item.id;
    }

    trackThinkAloudById(index: number, item: ThinkAloud) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-video-popup',
    template: ''
})
export class VideoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private videoPopupService: VideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.videoPopupService
                    .open(VideoDialogComponent, params['id']);
            } else {
                this.modalRef = this.videoPopupService
                    .open(VideoDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
