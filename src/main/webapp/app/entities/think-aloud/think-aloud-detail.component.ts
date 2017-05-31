import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { ThinkAloud } from './think-aloud.model';
import { ThinkAloudService } from './think-aloud.service';

@Component({
    selector: 'jhi-think-aloud-detail',
    templateUrl: './think-aloud-detail.component.html'
})
export class ThinkAloudDetailComponent implements OnInit, OnDestroy {

    thinkAloud: ThinkAloud;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private thinkAloudService: ThinkAloudService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInThinkAlouds();
    }

    load(id) {
        this.thinkAloudService.find(id).subscribe((thinkAloud) => {
            this.thinkAloud = thinkAloud;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInThinkAlouds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'thinkAloudListModification',
            (response) => this.load(this.thinkAloud.id)
        );
    }
}
