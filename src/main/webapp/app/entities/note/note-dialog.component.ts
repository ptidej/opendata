import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Note } from './note.model';
import { NotePopupService } from './note-popup.service';
import { NoteService } from './note.service';
import { Interview, InterviewService } from '../interview';
import { ThinkAloud, ThinkAloudService } from '../think-aloud';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-note-dialog',
    templateUrl: './note-dialog.component.html'
})
export class NoteDialogComponent implements OnInit {

    note: Note;
    authorities: any[];
    isSaving: boolean;

    interviews: Interview[];

    thinkalouds: ThinkAloud[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private noteService: NoteService,
        private interviewService: InterviewService,
        private thinkAloudService: ThinkAloudService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.interviewService.query()
            .subscribe((res: ResponseWrapper) => { this.interviews = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.thinkAloudService.query()
            .subscribe((res: ResponseWrapper) => { this.thinkalouds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(
                this.noteService.update(this.note), false);
        } else {
            this.subscribeToSaveResponse(
                this.noteService.create(this.note), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Note>, isCreated: boolean) {
        result.subscribe((res: Note) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Note, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'seodinApp.note.created'
            : 'seodinApp.note.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'noteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackInterviewById(index: number, item: Interview) {
        return item.id;
    }

    trackThinkAloudById(index: number, item: ThinkAloud) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-note-popup',
    template: ''
})
export class NotePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notePopupService: NotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.notePopupService
                    .open(NoteDialogComponent, params['id']);
            } else {
                this.modalRef = this.notePopupService
                    .open(NoteDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
