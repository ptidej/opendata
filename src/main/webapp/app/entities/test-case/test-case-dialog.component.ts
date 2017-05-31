import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { TestCase } from './test-case.model';
import { TestCasePopupService } from './test-case-popup.service';
import { TestCaseService } from './test-case.service';
import { SoftwareSystem, SoftwareSystemService } from '../software-system';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-case-dialog',
    templateUrl: './test-case-dialog.component.html'
})
export class TestCaseDialogComponent implements OnInit {

    testCase: TestCase;
    authorities: any[];
    isSaving: boolean;

    softwaresystems: SoftwareSystem[];

    developers: Developer[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private testCaseService: TestCaseService,
        private softwareSystemService: SoftwareSystemService,
        private developerService: DeveloperService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.softwareSystemService
            .query({filter: 'testcase-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.testCase.softwareSystem || !this.testCase.softwareSystem.id) {
                    this.softwaresystems = res.json;
                } else {
                    this.softwareSystemService
                        .find(this.testCase.softwareSystem.id)
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
        if (this.testCase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testCaseService.update(this.testCase), false);
        } else {
            this.subscribeToSaveResponse(
                this.testCaseService.create(this.testCase), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<TestCase>, isCreated: boolean) {
        result.subscribe((res: TestCase) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TestCase, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.testCase.created'
            : 'seodinApp.testCase.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'testCaseListModification', content: 'OK'});
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
    selector: 'jhi-test-case-popup',
    template: ''
})
export class TestCasePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testCasePopupService: TestCasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.testCasePopupService
                    .open(TestCaseDialogComponent, params['id']);
            } else {
                this.modalRef = this.testCasePopupService
                    .open(TestCaseDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
