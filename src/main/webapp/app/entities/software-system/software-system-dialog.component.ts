import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { SoftwareSystem } from './software-system.model';
import { SoftwareSystemPopupService } from './software-system-popup.service';
import { SoftwareSystemService } from './software-system.service';
import { Study, StudyService } from '../study';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-software-system-dialog',
    templateUrl: './software-system-dialog.component.html'
})
export class SoftwareSystemDialogComponent implements OnInit {

    softwareSystem: SoftwareSystem;
    authorities: any[];
    isSaving: boolean;

    studies: Study[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private softwareSystemService: SoftwareSystemService,
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
        if (this.softwareSystem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.softwareSystemService.update(this.softwareSystem), false);
        } else {
            this.subscribeToSaveResponse(
                this.softwareSystemService.create(this.softwareSystem), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<SoftwareSystem>, isCreated: boolean) {
        result.subscribe((res: SoftwareSystem) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SoftwareSystem, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.softwareSystem.created'
            : 'seodinApp.softwareSystem.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'softwareSystemListModification', content: 'OK'});
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
    selector: 'jhi-software-system-popup',
    template: ''
})
export class SoftwareSystemPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private softwareSystemPopupService: SoftwareSystemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.softwareSystemPopupService
                    .open(SoftwareSystemDialogComponent, params['id']);
            } else {
                this.modalRef = this.softwareSystemPopupService
                    .open(SoftwareSystemDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
