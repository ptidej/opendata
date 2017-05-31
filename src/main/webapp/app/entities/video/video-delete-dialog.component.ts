import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Video } from './video.model';
import { VideoPopupService } from './video-popup.service';
import { VideoService } from './video.service';

@Component({
    selector: 'jhi-video-delete-dialog',
    templateUrl: './video-delete-dialog.component.html'
})
export class VideoDeleteDialogComponent {

    video: Video;

    constructor(
        private videoService: VideoService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.videoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'videoListModification',
                content: 'Deleted an video'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('seodinApp.video.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-video-delete-popup',
    template: ''
})
export class VideoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private videoPopupService: VideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.videoPopupService
                .open(VideoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
