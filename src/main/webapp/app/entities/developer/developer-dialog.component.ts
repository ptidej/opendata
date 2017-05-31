import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Developer } from './developer.model';
import { DeveloperPopupService } from './developer-popup.service';
import { DeveloperService } from './developer.service';
import { Study, StudyService } from '../study';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-developer-dialog',
    templateUrl: './developer-dialog.component.html'
})
export class DeveloperDialogComponent implements OnInit {

    developer: Developer;
    authorities: any[];
    isSaving: boolean;

    studies: Study[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private developerService: DeveloperService,
        private studyService: StudyService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.studyService.query()
            .subscribe((res: ResponseWrapper) => { this.studies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.developer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.developerService.update(this.developer), false);
        } else {
            this.subscribeToSaveResponse(
                this.developerService.create(this.developer), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Developer>, isCreated: boolean) {
        result.subscribe((res: Developer) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Developer, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.developer.created'
            : 'seodinApp.developer.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'developerListModification', content: 'OK'});
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

    trackStudyById(index: number, item: Study) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-developer-popup',
    template: ''
})
export class DeveloperPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private developerPopupService: DeveloperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.developerPopupService
                    .open(DeveloperDialogComponent, params['id']);
            } else {
                this.modalRef = this.developerPopupService
                    .open(DeveloperDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
