import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AudioComponent } from './audio.component';
import { AudioDetailComponent } from './audio-detail.component';
import { AudioPopupComponent } from './audio-dialog.component';
import { AudioDeletePopupComponent } from './audio-delete-dialog.component';

import { Principal } from '../../shared';

export const audioRoute: Routes = [
    {
        path: 'audio',
        component: AudioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.audio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'audio/:id',
        component: AudioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.audio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const audioPopupRoute: Routes = [
    {
        path: 'audio-new',
        component: AudioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.audio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'audio/:id/edit',
        component: AudioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.audio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'audio/:id/delete',
        component: AudioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seodinApp.audio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
