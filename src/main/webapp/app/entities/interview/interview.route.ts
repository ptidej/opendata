import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { InterviewComponent } from './interview.component';
import { InterviewDetailComponent } from './interview-detail.component';
import { InterviewPopupComponent } from './interview-dialog.component';
import { InterviewDeletePopupComponent } from './interview-delete-dialog.component';
import { InterviewSearchPopupComponent } from './interview-search-dialog.component';

import { Principal } from '../../shared';

export const interviewRoute: Routes = [
    {
        path: 'interview',
        component: InterviewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'interview/:id',
        component: InterviewDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewPopupRoute: Routes = [
    {
        path: 'interview-new',
        component: InterviewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview/:id/edit',
        component: InterviewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview/:id/delete',
        component: InterviewDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interview/:id/search',
        component: InterviewSearchPopupComponent,
        data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
