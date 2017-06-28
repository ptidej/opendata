import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { SoftwareSystem } from './software-system.model';
import { SoftwareSystemService } from './software-system.service';

@Component({
    selector: 'jhi-software-system-detail',
    templateUrl: './software-system-detail.component.html'
})
export class SoftwareSystemDetailComponent implements OnInit, OnDestroy {

    softwareSystem: SoftwareSystem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private softwareSystemService: SoftwareSystemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSoftwareSystems();
    }

    load(id) {
        this.softwareSystemService.find(id).subscribe((softwareSystem) => {
            this.softwareSystem = softwareSystem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSoftwareSystems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'softwareSystemListModification',
            (response) => this.load(this.softwareSystem.id)
        );
    }
}
