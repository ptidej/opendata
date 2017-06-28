import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Diary } from './diary.model';
import { DiaryPopupService } from './diary-popup.service';
import { DiaryService } from './diary.service';
import { SoftwareSystem, SoftwareSystemService } from '../software-system';
import { Task, TaskService } from '../task';
import { Developer, DeveloperService } from '../developer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-diary-dialog',
    templateUrl: './diary-dialog.component.html'
})
export class DiaryDialogComponent implements OnInit {

    diary: Diary;
    authorities: any[];
    isSaving: boolean;

    softwaresystems: SoftwareSystem[];

    tasks: Task[];

    developers: Developer[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private diaryService: DiaryService,
        private softwareSystemService: SoftwareSystemService,
        private taskService: TaskService,
        private developerService: DeveloperService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.softwareSystemService.query()
            .subscribe((res: ResponseWrapper) => { this.softwaresystems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.taskService.query()
            .subscribe((res: ResponseWrapper) => { this.tasks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.developerService.query()
            .subscribe((res: ResponseWrapper) => { this.developers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.diary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diaryService.update(this.diary), false);
        } else {
            this.subscribeToSaveResponse(
                this.diaryService.create(this.diary), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Diary>, isCreated: boolean) {
        result.subscribe((res: Diary) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Diary, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.diary.created'
            : 'seodinApp.diary.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'diaryListModification', content: 'OK'});
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

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    trackDeveloperById(index: number, item: Developer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-diary-popup',
    template: ''
})
export class DiaryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaryPopupService: DiaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.diaryPopupService
                    .open(DiaryDialogComponent, params['id']);
            } else {
                this.modalRef = this.diaryPopupService
                    .open(DiaryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
