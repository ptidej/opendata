import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ThinkAloud } from './think-aloud.model';
import { ThinkAloudService } from './think-aloud.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-think-aloud',
    templateUrl: './think-aloud.component.html'
})
export class ThinkAloudComponent implements OnInit, OnDestroy {
thinkAlouds: ThinkAloud[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thinkAloudService: ThinkAloudService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.thinkAloudService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.thinkAlouds = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.thinkAloudService.query().subscribe(
            (res: ResponseWrapper) => {
                this.thinkAlouds = res.json;
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
        this.registerChangeInThinkAlouds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ThinkAloud) {
        return item.id;
    }
    registerChangeInThinkAlouds() {
        this.eventSubscriber = this.eventManager.subscribe('thinkAloudListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
