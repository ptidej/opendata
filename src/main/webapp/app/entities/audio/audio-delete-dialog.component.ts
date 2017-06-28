import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Audio } from './audio.model';
import { AudioPopupService } from './audio-popup.service';
import { AudioService } from './audio.service';

@Component({
    selector: 'jhi-audio-delete-dialog',
    templateUrl: './audio-delete-dialog.component.html'
})
export class AudioDeleteDialogComponent {

    audio: Audio;

    constructor(
        private audioService: AudioService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.audioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'audioListModification',
                content: 'Deleted an audio'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.audio.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-audio-delete-popup',
    template: ''
})
export class AudioDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audioPopupService: AudioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.audioPopupService
                .open(AudioDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
