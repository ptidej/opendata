import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Interview } from './interview.model';
import { InterviewPopupService } from './interview-popup.service';
import { InterviewService } from './interview.service';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-interview-dialog',
    templateUrl: './interview-dialog.component.html'
})
export class InterviewDialogComponent implements OnInit {

    interview: Interview;
    authorities: any[];
    isSaving: boolean;

    developers: Developer[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private interviewService: InterviewService,
        private developerService: DeveloperService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.developerService.query()
            .subscribe((res: ResponseWrapper) => { this.developers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.interview.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interviewService.update(this.interview), false);
        } else {
            this.subscribeToSaveResponse(
                this.interviewService.create(this.interview), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Interview>, isCreated: boolean) {
        result.subscribe((res: Interview) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Interview, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.interview.created'
            : 'seodinApp.interview.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'interviewListModification', content: 'OK'});
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

    trackDeveloperById(index: number, item: Developer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-interview-popup',
    template: ''
})
export class InterviewPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewPopupService: InterviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.interviewPopupService
                    .open(InterviewDialogComponent, params['id']);
            } else {
                this.modalRef = this.interviewPopupService
                    .open(InterviewDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
