import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Developer } from './developer.model';
import { DeveloperService } from './developer.service';

@Component({
    selector: 'jhi-developer-detail',
    templateUrl: './developer-detail.component.html'
})
export class DeveloperDetailComponent implements OnInit, OnDestroy {

    developer: Developer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private developerService: DeveloperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDevelopers();
    }

    load(id) {
        this.developerService.find(id).subscribe((developer) => {
            this.developer = developer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDevelopers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'developerListModification',
            (response) => this.load(this.developer.id)
        );
    }
}
