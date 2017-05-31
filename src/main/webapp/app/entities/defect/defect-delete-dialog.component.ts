import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Defect } from './defect.model';
import { DefectPopupService } from './defect-popup.service';
import { DefectService } from './defect.service';

@Component({
    selector: 'jhi-defect-delete-dialog',
    templateUrl: './defect-delete-dialog.component.html'
})
export class DefectDeleteDialogComponent {

    defect: Defect;

    constructor(
        private defectService: DefectService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'defectListModification',
                content: 'Deleted an defect'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.defect.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-defect-delete-popup',
    template: ''
})
export class DefectDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defectPopupService: DefectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.defectPopupService
                .open(DefectDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
