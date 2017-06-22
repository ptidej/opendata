import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { InteractiveLog } from './interactive-log.model';
import { InteractiveLogPopupService } from './interactive-log-popup.service';
import { InteractiveLogService } from './interactive-log.service';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-interactive-log-dialog',
    templateUrl: './interactive-log-dialog.component.html'
})
export class InteractiveLogDialogComponent implements OnInit {

    interactiveLog: InteractiveLog;
    authorities: any[];
    isSaving: boolean;

    developers: Developer[];
    recordedDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private interactiveLogService: InteractiveLogService,
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
        if (this.interactiveLog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interactiveLogService.update(this.interactiveLog), false);
        } else {
            this.subscribeToSaveResponse(
                this.interactiveLogService.create(this.interactiveLog), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<InteractiveLog>, isCreated: boolean) {
        result.subscribe((res: InteractiveLog) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: InteractiveLog, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.interactiveLog.created'
            : 'seodinApp.interactiveLog.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'interactiveLogListModification', content: 'OK'});
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
    selector: 'jhi-interactive-log-popup',
    template: ''
})
export class InteractiveLogPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interactiveLogPopupService: InteractiveLogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.interactiveLogPopupService
                    .open(InteractiveLogDialogComponent, params['id']);
            } else {
                this.modalRef = this.interactiveLogPopupService
                    .open(InteractiveLogDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
