import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { SourceCode } from './source-code.model';
import { SourceCodeService } from './source-code.service';

@Component({
    selector: 'jhi-source-code-detail',
    templateUrl: './source-code-detail.component.html'
})
export class SourceCodeDetailComponent implements OnInit, OnDestroy {

    sourceCode: SourceCode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private sourceCodeService: SourceCodeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSourceCodes();
    }

    load(id) {
        this.sourceCodeService.find(id).subscribe((sourceCode) => {
            this.sourceCode = sourceCode;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSourceCodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sourceCodeListModification',
            (response) => this.load(this.sourceCode.id)
        );
    }
}
