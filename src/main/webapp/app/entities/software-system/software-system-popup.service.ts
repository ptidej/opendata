import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SoftwareSystem } from './software-system.model';
import { SoftwareSystemService } from './software-system.service';
@Injectable()
export class SoftwareSystemPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private softwareSystemService: SoftwareSystemService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.softwareSystemService.find(id).subscribe((softwareSystem) => {
                this.softwareSystemModalRef(component, softwareSystem);
            });
        } else {
            return this.softwareSystemModalRef(component, new SoftwareSystem());
        }
    }

    softwareSystemModalRef(component: Component, softwareSystem: SoftwareSystem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.softwareSystem = softwareSystem;
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
