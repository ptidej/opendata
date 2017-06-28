import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Study } from './study.model';
import { StudyPopupService } from './study-popup.service';
import { StudyService } from './study.service';

@Component({
    selector: 'jhi-study-dialog',
    templateUrl: './study-dialog.component.html'
})
export class StudyDialogComponent implements OnInit {

    study: Study;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private studyService: StudyService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.study.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studyService.update(this.study), false);
        } else {
            this.subscribeToSaveResponse(
                this.studyService.create(this.study), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Study>, isCreated: boolean) {
        result.subscribe((res: Study) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Study, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.study.created'
            : 'seodinApp.study.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'studyListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-study-popup',
    template: ''
})
export class StudyPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studyPopupService: StudyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.studyPopupService
                    .open(StudyDialogComponent, params['id']);
            } else {
                this.modalRef = this.studyPopupService
                    .open(StudyDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
