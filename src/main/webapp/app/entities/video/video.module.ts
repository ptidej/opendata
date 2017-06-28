import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    VideoService,
    VideoPopupService,
    VideoComponent,
    VideoDetailComponent,
    VideoDialogComponent,
    VideoPopupComponent,
    VideoDeletePopupComponent,
    VideoDeleteDialogComponent,
    videoRoute,
    videoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...videoRoute,
    ...videoPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VideoComponent,
        VideoDetailComponent,
        VideoDialogComponent,
        VideoDeleteDialogComponent,
        VideoPopupComponent,
        VideoDeletePopupComponent,
    ],
    entryComponents: [
        VideoComponent,
        VideoDialogComponent,
        VideoPopupComponent,
        VideoDeleteDialogComponent,
        VideoDeletePopupComponent,
    ],
    providers: [
        VideoService,
        VideoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinVideoModule {}
