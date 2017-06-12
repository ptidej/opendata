import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ExploreComponent } from './explore.component';

import { Principal } from '../../shared';

export const exploreRoute: Routes = [
    {
        path: 'explore',
        component: ExploreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.researcher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
