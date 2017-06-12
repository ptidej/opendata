import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { StudyComponent } from './study.component';
import { StudyDetailComponent } from './study-detail.component';
import { StudyPopupComponent } from './study-dialog.component';

import { Principal } from '../../shared';

export const studyRoute: Routes = [
    {
        path: 'study',
        component: StudyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.study.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'study/:id',
        component: StudyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.study.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studyPopupRoute: Routes = [
    {
        path: 'study-new',
        component: StudyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'seodinApp.study.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'study/:id/edit',
        component: StudyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'seodinApp.study.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
