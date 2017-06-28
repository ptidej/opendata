import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DeveloperComponent } from './developer.component';
import { DeveloperDetailComponent } from './developer-detail.component';
import { DeveloperPopupComponent } from './developer-dialog.component';
import { DeveloperDeletePopupComponent } from './developer-delete-dialog.component';

import { Principal } from '../../shared';

export const developerRoute: Routes = [
    {
        path: 'developer',
        component: DeveloperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'developer/:id',
        component: DeveloperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const developerPopupRoute: Routes = [
    {
        path: 'developer-new',
        component: DeveloperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'developer/:id/edit',
        component: DeveloperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'developer/:id/delete',
        component: DeveloperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.developer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
