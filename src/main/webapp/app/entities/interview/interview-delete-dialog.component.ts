import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Interview } from './interview.model';
import { InterviewPopupService } from './interview-popup.service';
import { InterviewService } from './interview.service';

@Component({
    selector: 'jhi-interview-delete-dialog',
    templateUrl: './interview-delete-dialog.component.html'
})
export class InterviewDeleteDialogComponent {

    interview: Interview;

    constructor(
        private interviewService: InterviewService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interviewService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interviewListModification',
                content: 'Deleted an interview'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.interview.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-interview-delete-popup',
    template: ''
})
export class InterviewDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interviewPopupService: InterviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.interviewPopupService
                .open(InterviewDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
