import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DesignPatternComponent } from './design-pattern.component';
import { DesignPatternDetailComponent } from './design-pattern-detail.component';
import { DesignPatternPopupComponent } from './design-pattern-dialog.component';
import { DesignPatternDeletePopupComponent } from './design-pattern-delete-dialog.component';

import { Principal } from '../../shared';

export const designPatternRoute: Routes = [
    {
        path: 'design-pattern',
        component: DesignPatternComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.designPattern.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'design-pattern/:id',
        component: DesignPatternDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.designPattern.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const designPatternPopupRoute: Routes = [
    {
        path: 'design-pattern-new',
        component: DesignPatternPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.designPattern.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'design-pattern/:id/edit',
        component: DesignPatternPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.designPattern.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'design-pattern/:id/delete',
        component: DesignPatternDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.designPattern.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
