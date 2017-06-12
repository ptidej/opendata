import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Script } from './script.model';
import { ScriptPopupService } from './script-popup.service';
import { ScriptService } from './script.service';

@Component({
    selector: 'jhi-script-dialog',
    templateUrl: './script-dialog.component.html'
})
export class ScriptDialogComponent implements OnInit {

    script: Script;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private scriptService: ScriptService,
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
        if (this.script.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scriptService.update(this.script), false);
        } else {
            this.subscribeToSaveResponse(
                this.scriptService.create(this.script), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Script>, isCreated: boolean) {
        result.subscribe((res: Script) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Script, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.script.created'
            : 'seodinApp.script.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'scriptListModification', content: 'OK'});
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
    selector: 'jhi-script-popup',
    template: ''
})
export class ScriptPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scriptPopupService: ScriptPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scriptPopupService
                    .open(ScriptDialogComponent, params['id']);
            } else {
                this.modalRef = this.scriptPopupService
                    .open(ScriptDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
