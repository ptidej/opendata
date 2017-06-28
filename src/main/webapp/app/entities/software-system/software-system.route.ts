import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SoftwareSystemComponent } from './software-system.component';
import { SoftwareSystemDetailComponent } from './software-system-detail.component';
import { SoftwareSystemPopupComponent } from './software-system-dialog.component';
import { SoftwareSystemDeletePopupComponent } from './software-system-delete-dialog.component';

import { Principal } from '../../shared';

export const softwareSystemRoute: Routes = [
    {
        path: 'software-system',
        component: SoftwareSystemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.softwareSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'software-system/:id',
        component: SoftwareSystemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.softwareSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const softwareSystemPopupRoute: Routes = [
    {
        path: 'software-system-new',
        component: SoftwareSystemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.softwareSystem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'software-system/:id/edit',
        component: SoftwareSystemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.softwareSystem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'software-system/:id/delete',
        component: SoftwareSystemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.softwareSystem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
