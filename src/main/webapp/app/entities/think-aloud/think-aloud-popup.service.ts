import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ThinkAloud } from './think-aloud.model';
import { ThinkAloudService } from './think-aloud.service';

@Injectable()
export class ThinkAloudPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private thinkAloudService: ThinkAloudService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.thinkAloudService.find(id).subscribe((thinkAloud) => {
                this.thinkAloudModalRef(component, thinkAloud);
            });
        } else {
            return this.thinkAloudModalRef(component, new ThinkAloud());
        }
    }

    thinkAloudModalRef(component: Component, thinkAloud: ThinkAloud): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.thinkAloud = thinkAloud;
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
