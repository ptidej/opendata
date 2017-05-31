import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Interview } from './interview.model';
import { InterviewService } from './interview.service';

@Component({
    selector: 'jhi-interview-detail',
    templateUrl: './interview-detail.component.html'
})
export class InterviewDetailComponent implements OnInit, OnDestroy {

    interview: Interview;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private interviewService: InterviewService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInterviews();
    }

    load(id) {
        this.interviewService.find(id).subscribe((interview) => {
            this.interview = interview;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInterviews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interviewListModification',
            (response) => this.load(this.interview.id)
        );
    }
}
