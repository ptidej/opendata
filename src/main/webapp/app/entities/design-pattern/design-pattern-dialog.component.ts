import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { DesignPattern } from './design-pattern.model';
import { DesignPatternPopupService } from './design-pattern-popup.service';
import { DesignPatternService } from './design-pattern.service';
import { SourceCode, SourceCodeService } from '../source-code';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-design-pattern-dialog',
    templateUrl: './design-pattern-dialog.component.html'
})
export class DesignPatternDialogComponent implements OnInit {

    designPattern: DesignPattern;
    authorities: any[];
    isSaving: boolean;

    sourcecodes: SourceCode[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private designPatternService: DesignPatternService,
        private sourceCodeService: SourceCodeService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.sourceCodeService.query()
            .subscribe((res: ResponseWrapper) => { this.sourcecodes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.designPattern.id !== undefined) {
            this.subscribeToSaveResponse(
                this.designPatternService.update(this.designPattern), false);
        } else {
            this.subscribeToSaveResponse(
                this.designPatternService.create(this.designPattern), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<DesignPattern>, isCreated: boolean) {
        result.subscribe((res: DesignPattern) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DesignPattern, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.designPattern.created'
            : 'seodinApp.designPattern.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'designPatternListModification', content: 'OK'});
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

    trackSourceCodeById(index: number, item: SourceCode) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-design-pattern-popup',
    template: ''
})
export class DesignPatternPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private designPatternPopupService: DesignPatternPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.designPatternPopupService
                    .open(DesignPatternDialogComponent, params['id']);
            } else {
                this.modalRef = this.designPatternPopupService
                    .open(DesignPatternDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
