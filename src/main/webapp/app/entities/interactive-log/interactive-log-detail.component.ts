import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { InteractiveLog } from './interactive-log.model';
import { InteractiveLogService } from './interactive-log.service';

@Component({
    selector: 'jhi-interactive-log-detail',
    templateUrl: './interactive-log-detail.component.html'
})
export class InteractiveLogDetailComponent implements OnInit, OnDestroy {

    interactiveLog: InteractiveLog;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private interactiveLogService: InteractiveLogService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInteractiveLogs();
    }

    load(id) {
        this.interactiveLogService.find(id).subscribe((interactiveLog) => {
            this.interactiveLog = interactiveLog;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInteractiveLogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interactiveLogListModification',
            (response) => this.load(this.interactiveLog.id)
        );
    }
}
