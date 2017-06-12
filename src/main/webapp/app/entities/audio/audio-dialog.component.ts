import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Audio } from './audio.model';
import { AudioPopupService } from './audio-popup.service';
import { AudioService } from './audio.service';
import { Interview, InterviewService } from '../interview';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-audio-dialog',
    templateUrl: './audio-dialog.component.html'
})
export class AudioDialogComponent implements OnInit {

    audio: Audio;
    authorities: any[];
    isSaving: boolean;

    interviews: Interview[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private audioService: AudioService,
        private interviewService: InterviewService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.interviewService.query()
            .subscribe((res: ResponseWrapper) => { this.interviews = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.audio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.audioService.update(this.audio), false);
        } else {
            this.subscribeToSaveResponse(
                this.audioService.create(this.audio), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Audio>, isCreated: boolean) {
        result.subscribe((res: Audio) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Audio, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.audio.created'
            : 'seodinApp.audio.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'audioListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-audio-popup',
    template: ''
})
export class AudioPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audioPopupService: AudioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.audioPopupService
                    .open(AudioDialogComponent, params['id']);
            } else {
                this.modalRef = this.audioPopupService
                    .open(AudioDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
