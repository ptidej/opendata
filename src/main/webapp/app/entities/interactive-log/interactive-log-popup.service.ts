import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InteractiveLog } from './interactive-log.model';
import { InteractiveLogService } from './interactive-log.service';

@Injectable()
export class InteractiveLogPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private interactiveLogService: InteractiveLogService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.interactiveLogService.find(id).subscribe((interactiveLog) => {
                if (interactiveLog.recorded) {
                    interactiveLog.recorded = {
                        year: interactiveLog.recorded.getFullYear(),
                        month: interactiveLog.recorded.getMonth() + 1,
                        day: interactiveLog.recorded.getDate()
                    };
                }
                this.interactiveLogModalRef(component, interactiveLog);
            });
        } else {
            return this.interactiveLogModalRef(component, new InteractiveLog());
        }
    }

    interactiveLogModalRef(component: Component, interactiveLog: InteractiveLog): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.interactiveLog = interactiveLog;
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
