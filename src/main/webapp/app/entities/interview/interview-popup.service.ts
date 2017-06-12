import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Interview } from './interview.model';
import { InterviewService } from './interview.service';

@Injectable()
export class InterviewPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private interviewService: InterviewService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.interviewService.find(id).subscribe((interview) => {
                if (interview.registred) {
                    interview.registred = {
                        year: interview.registred.getFullYear(),
                        month: interview.registred.getMonth() + 1,
                        day: interview.registred.getDate()
                    };
                }
                this.interviewModalRef(component, interview);
            });
        } else {
            return this.interviewModalRef(component, new Interview());
        }
    }

    interviewModalRef(component: Component, interview: Interview): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.interview = interview;
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
