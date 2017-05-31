import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Defect } from './defect.model';
import { DefectService } from './defect.service';

@Component({
    selector: 'jhi-defect-detail',
    templateUrl: './defect-detail.component.html'
})
export class DefectDetailComponent implements OnInit, OnDestroy {

    defect: Defect;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private defectService: DefectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDefects();
    }

    load(id) {
        this.defectService.find(id).subscribe((defect) => {
            this.defect = defect;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDefects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'defectListModification',
            (response) => this.load(this.defect.id)
        );
    }
}
