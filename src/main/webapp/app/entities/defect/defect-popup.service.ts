import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Defect } from './defect.model';
import { DefectService } from './defect.service';

@Injectable()
export class DefectPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private defectService: DefectService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.defectService.find(id).subscribe((defect) => {
                if (defect.recorded) {
                    defect.recorded = {
                        year: defect.recorded.getFullYear(),
                        month: defect.recorded.getMonth() + 1,
                        day: defect.recorded.getDate()
                    };
                }
                if (defect.modified) {
                    defect.modified = {
                        year: defect.modified.getFullYear(),
                        month: defect.modified.getMonth() + 1,
                        day: defect.modified.getDate()
                    };
                }
                this.defectModalRef(component, defect);
            });
        } else {
            return this.defectModalRef(component, new Defect());
        }
    }

    defectModalRef(component: Component, defect: Defect): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.defect = defect;
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
