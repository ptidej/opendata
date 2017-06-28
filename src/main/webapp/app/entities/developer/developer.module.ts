import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    DeveloperService,
    DeveloperPopupService,
    DeveloperComponent,
    DeveloperDetailComponent,
    DeveloperDialogComponent,
    DeveloperPopupComponent,
    DeveloperDeletePopupComponent,
    DeveloperDeleteDialogComponent,
    developerRoute,
    developerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...developerRoute,
    ...developerPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeveloperComponent,
        DeveloperDetailComponent,
        DeveloperDialogComponent,
        DeveloperDeleteDialogComponent,
        DeveloperPopupComponent,
        DeveloperDeletePopupComponent,
    ],
    entryComponents: [
        DeveloperComponent,
        DeveloperDialogComponent,
        DeveloperPopupComponent,
        DeveloperDeleteDialogComponent,
        DeveloperDeletePopupComponent,
    ],
    providers: [
        DeveloperService,
        DeveloperPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinDeveloperModule {}
