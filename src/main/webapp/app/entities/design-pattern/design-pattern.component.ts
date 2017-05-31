import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { DesignPattern } from './design-pattern.model';
import { DesignPatternService } from './design-pattern.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-design-pattern',
    templateUrl: './design-pattern.component.html'
})
export class DesignPatternComponent implements OnInit, OnDestroy {
designPatterns: DesignPattern[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private designPatternService: DesignPatternService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.designPatternService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.designPatterns = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.designPatternService.query().subscribe(
            (res: ResponseWrapper) => {
                this.designPatterns = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDesignPatterns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DesignPattern) {
        return item.id;
    }
    registerChangeInDesignPatterns() {
        this.eventSubscriber = this.eventManager.subscribe('designPatternListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
