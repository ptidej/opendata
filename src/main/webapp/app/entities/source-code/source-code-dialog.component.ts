import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { SourceCode } from './source-code.model';
import { SourceCodePopupService } from './source-code-popup.service';
import { SourceCodeService } from './source-code.service';
import { SoftwareSystem, SoftwareSystemService } from '../software-system';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-source-code-dialog',
    templateUrl: './source-code-dialog.component.html'
})
export class SourceCodeDialogComponent implements OnInit {

    sourceCode: SourceCode;
    authorities: any[];
    isSaving: boolean;

    softwaresystems: SoftwareSystem[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private sourceCodeService: SourceCodeService,
        private softwareSystemService: SoftwareSystemService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.softwareSystemService.query()
            .subscribe((res: ResponseWrapper) => { this.softwaresystems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sourceCode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sourceCodeService.update(this.sourceCode), false);
        } else {
            this.subscribeToSaveResponse(
                this.sourceCodeService.create(this.sourceCode), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<SourceCode>, isCreated: boolean) {
        result.subscribe((res: SourceCode) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SourceCode, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.sourceCode.created'
            : 'seodinApp.sourceCode.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'sourceCodeListModification', content: 'OK'});
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

    trackSoftwareSystemById(index: number, item: SoftwareSystem) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-source-code-popup',
    template: ''
})
export class SourceCodePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sourceCodePopupService: SourceCodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.sourceCodePopupService
                    .open(SourceCodeDialogComponent, params['id']);
            } else {
                this.modalRef = this.sourceCodePopupService
                    .open(SourceCodeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
