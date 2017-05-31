import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { ThinkAloud } from './think-aloud.model';
import { ThinkAloudPopupService } from './think-aloud-popup.service';
import { ThinkAloudService } from './think-aloud.service';
import { SoftwareSystem, SoftwareSystemService } from '../software-system';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-think-aloud-dialog',
    templateUrl: './think-aloud-dialog.component.html'
})
export class ThinkAloudDialogComponent implements OnInit {

    thinkAloud: ThinkAloud;
    authorities: any[];
    isSaving: boolean;

    softwaresystems: SoftwareSystem[];

    developers: Developer[];
    registredDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private thinkAloudService: ThinkAloudService,
        private softwareSystemService: SoftwareSystemService,
        private developerService: DeveloperService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.softwareSystemService
            .query({filter: 'thinkaloud-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.thinkAloud.softwareSystem || !this.thinkAloud.softwareSystem.id) {
                    this.softwaresystems = res.json;
                } else {
                    this.softwareSystemService
                        .find(this.thinkAloud.softwareSystem.id)
                        .subscribe((subRes: SoftwareSystem) => {
                            this.softwaresystems = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.developerService.query()
            .subscribe((res: ResponseWrapper) => { this.developers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.thinkAloud.id !== undefined) {
            this.subscribeToSaveResponse(
                this.thinkAloudService.update(this.thinkAloud), false);
        } else {
            this.subscribeToSaveResponse(
                this.thinkAloudService.create(this.thinkAloud), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<ThinkAloud>, isCreated: boolean) {
        result.subscribe((res: ThinkAloud) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ThinkAloud, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.thinkAloud.created'
            : 'seodinApp.thinkAloud.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'thinkAloudListModification', content: 'OK'});
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

    trackDeveloperById(index: number, item: Developer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-think-aloud-popup',
    template: ''
})
export class ThinkAloudPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thinkAloudPopupService: ThinkAloudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.thinkAloudPopupService
                    .open(ThinkAloudDialogComponent, params['id']);
            } else {
                this.modalRef = this.thinkAloudPopupService
                    .open(ThinkAloudDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
