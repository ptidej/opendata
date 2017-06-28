import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Diary } from './diary.model';
import { DiaryService } from './diary.service';

@Component({
    selector: 'jhi-diary-detail',
    templateUrl: './diary-detail.component.html'
})
export class DiaryDetailComponent implements OnInit, OnDestroy {

    diary: Diary;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private diaryService: DiaryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiaries();
    }

    load(id) {
        this.diaryService.find(id).subscribe((diary) => {
            this.diary = diary;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diaryListModification',
            (response) => this.load(this.diary.id)
        );
    }
}
