import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DesignPattern } from './design-pattern.model';
import { DesignPatternService } from './design-pattern.service';

@Injectable()
export class DesignPatternPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private designPatternService: DesignPatternService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.designPatternService.find(id).subscribe((designPattern) => {
                this.designPatternModalRef(component, designPattern);
            });
        } else {
            return this.designPatternModalRef(component, new DesignPattern());
        }
    }

    designPatternModalRef(component: Component, designPattern: DesignPattern): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.designPattern = designPattern;
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
