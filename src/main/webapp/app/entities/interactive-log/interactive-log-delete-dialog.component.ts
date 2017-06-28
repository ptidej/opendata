import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { InteractiveLog } from './interactive-log.model';
import { InteractiveLogPopupService } from './interactive-log-popup.service';
import { InteractiveLogService } from './interactive-log.service';

@Component({
    selector: 'jhi-interactive-log-delete-dialog',
    templateUrl: './interactive-log-delete-dialog.component.html'
})
export class InteractiveLogDeleteDialogComponent {

    interactiveLog: InteractiveLog;

    constructor(
        private interactiveLogService: InteractiveLogService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interactiveLogService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interactiveLogListModification',
                content: 'Deleted an interactiveLog'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.interactiveLog.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-interactive-log-delete-popup',
    template: ''
})
export class InteractiveLogDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interactiveLogPopupService: InteractiveLogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.interactiveLogPopupService
                .open(InteractiveLogDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
