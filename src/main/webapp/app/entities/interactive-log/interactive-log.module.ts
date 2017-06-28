import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    InteractiveLogService,
    InteractiveLogPopupService,
    InteractiveLogComponent,
    InteractiveLogDetailComponent,
    InteractiveLogDialogComponent,
    InteractiveLogPopupComponent,
    InteractiveLogDeletePopupComponent,
    InteractiveLogDeleteDialogComponent,
    interactiveLogRoute,
    interactiveLogPopupRoute,
} from './';

const ENTITY_STATES = [
    ...interactiveLogRoute,
    ...interactiveLogPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InteractiveLogComponent,
        InteractiveLogDetailComponent,
        InteractiveLogDialogComponent,
        InteractiveLogDeleteDialogComponent,
        InteractiveLogPopupComponent,
        InteractiveLogDeletePopupComponent,
    ],
    entryComponents: [
        InteractiveLogComponent,
        InteractiveLogDialogComponent,
        InteractiveLogPopupComponent,
        InteractiveLogDeleteDialogComponent,
        InteractiveLogDeletePopupComponent,
    ],
    providers: [
        InteractiveLogService,
        InteractiveLogPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinInteractiveLogModule {}
