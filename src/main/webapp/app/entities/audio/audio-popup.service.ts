import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Audio } from './audio.model';
import { AudioService } from './audio.service';

@Injectable()
export class AudioPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private audioService: AudioService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.audioService.find(id).subscribe((audio) => {
                if (audio.recorded) {
                    audio.recorded = {
                        year: audio.recorded.getFullYear(),
                        month: audio.recorded.getMonth() + 1,
                        day: audio.recorded.getDate()
                    };
                }
                this.audioModalRef(component, audio);
            });
        } else {
            return this.audioModalRef(component, new Audio());
        }
    }

    audioModalRef(component: Component, audio: Audio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.audio = audio;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
