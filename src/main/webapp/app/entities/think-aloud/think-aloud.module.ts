import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    ThinkAloudService,
    ThinkAloudPopupService,
    ThinkAloudComponent,
    ThinkAloudDetailComponent,
    ThinkAloudDialogComponent,
    ThinkAloudPopupComponent,
    ThinkAloudDeletePopupComponent,
    ThinkAloudDeleteDialogComponent,
    ThinkAloudSearchPopupComponent,
    ThinkAloudSearchDialogComponent,
    thinkAloudRoute,
    thinkAloudPopupRoute,
} from './';

const ENTITY_STATES = [
    ...thinkAloudRoute,
    ...thinkAloudPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ThinkAloudComponent,
        ThinkAloudDetailComponent,
        ThinkAloudDialogComponent,
        ThinkAloudDeleteDialogComponent,
        ThinkAloudPopupComponent,
        ThinkAloudDeletePopupComponent,
        ThinkAloudSearchPopupComponent,
        ThinkAloudSearchDialogComponent,
    ],
    entryComponents: [
        ThinkAloudComponent,
        ThinkAloudDialogComponent,
        ThinkAloudPopupComponent,
        ThinkAloudDeleteDialogComponent,
        ThinkAloudDeletePopupComponent,
        ThinkAloudSearchPopupComponent,
        ThinkAloudSearchDialogComponent,
    ],
    providers: [
        ThinkAloudService,
        ThinkAloudPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinThinkAloudModule {}
