import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Diary } from './diary.model';
import { DiaryPopupService } from './diary-popup.service';
import { DiaryService } from './diary.service';

@Component({
    selector: 'jhi-diary-delete-dialog',
    templateUrl: './diary-delete-dialog.component.html'
})
export class DiaryDeleteDialogComponent {

    diary: Diary;

    constructor(
        private diaryService: DiaryService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diaryListModification',
                content: 'Deleted an diary'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.diary.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-diary-delete-popup',
    template: ''
})
export class DiaryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaryPopupService: DiaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.diaryPopupService
                .open(DiaryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
