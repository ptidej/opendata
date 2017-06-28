import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { VideoComponent } from './video.component';
import { VideoDetailComponent } from './video-detail.component';
import { VideoPopupComponent } from './video-dialog.component';
import { VideoDeletePopupComponent } from './video-delete-dialog.component';

import { Principal } from '../../shared';

export const videoRoute: Routes = [
    {
        path: 'video',
        component: VideoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.video.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'video/:id',
        component: VideoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.video.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const videoPopupRoute: Routes = [
    {
        path: 'video-new',
        component: VideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.video.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'video/:id/edit',
        component: VideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.video.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'video/:id/delete',
        component: VideoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.video.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
