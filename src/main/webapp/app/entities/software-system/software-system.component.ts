import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { SoftwareSystem } from './software-system.model';
import { SoftwareSystemService } from './software-system.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-software-system',
    templateUrl: './software-system.component.html'
})
export class SoftwareSystemComponent implements OnInit, OnDestroy {
softwareSystems: SoftwareSystem[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private softwareSystemService: SoftwareSystemService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.softwareSystemService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.softwareSystems = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.softwareSystemService.query().subscribe(
            (res: ResponseWrapper) => {
                this.softwareSystems = res.json;
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
        this.registerChangeInSoftwareSystems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SoftwareSystem) {
        return item.id;
    }
    registerChangeInSoftwareSystems() {
        this.eventSubscriber = this.eventManager.subscribe('softwareSystemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
