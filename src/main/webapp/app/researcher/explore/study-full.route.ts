import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ExploreComponent } from './explore.component';
import { StudyFullComponent } from './study-full.component';
import { InterviewSearchPopupComponent } from '../../entities/interview/interview-search-dialog.component';
import { ThinkAloudSearchPopupComponent } from '../../entities/think-aloud/think-aloud-search-dialog.component';

import { Principal } from '../../shared';

export const studyFullRoute: Routes = [
    {
        path: 'study-full/:id',
        component: StudyFullComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.researcher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewPopupRoute: Routes = [
    {
        path: 'interview/:id/search',
        component: InterviewSearchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'thinkAloud/:id/search',
        component: ThinkAloudSearchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.interview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
