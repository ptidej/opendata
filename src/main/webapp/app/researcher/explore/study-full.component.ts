import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Study } from '../../entities/study/study.model';
import { StudyService } from '../../entities/study/study.service';

@Component({
    selector: 'jhi-study-full',
    templateUrl: './study-full.component.html'
})
export class StudyFullComponent implements OnInit, OnDestroy {

    study: Study;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private studyService: StudyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudies();
    }

    load(id) {
        this.studyService.find(id).subscribe((study) => {
            this.study = study;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studyListModification',
            (response) => this.load(this.study.id)
        );
    }
}
