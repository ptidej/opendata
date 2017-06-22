import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { Defect } from './defect.model';
import { DefectPopupService } from './defect-popup.service';
import { DefectService } from './defect.service';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-defect-dialog',
    templateUrl: './defect-dialog.component.html'
})
export class DefectDialogComponent implements OnInit {

    defect: Defect;
    authorities: any[];
    isSaving: boolean;

    developers: Developer[];
    recordedDp: any;
    modifiedDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private defectService: DefectService,
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, defect, field, isImage) {
        if (event && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                defect[field] = base64Data;
                defect[`${field}ContentType`] = file.type;
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.defect.id !== undefined) {
            this.subscribeToSaveResponse(
                this.defectService.update(this.defect), false);
        } else {
            this.subscribeToSaveResponse(
                this.defectService.create(this.defect), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Defect>, isCreated: boolean) {
        result.subscribe((res: Defect) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Defect, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.defect.created'
            : 'seodinApp.defect.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'defectListModification', content: 'OK'});
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
    selector: 'jhi-defect-popup',
    template: ''
})
export class DefectPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defectPopupService: DefectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.defectPopupService
                    .open(DefectDialogComponent, params['id']);
            } else {
                this.modalRef = this.defectPopupService
                    .open(DefectDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
