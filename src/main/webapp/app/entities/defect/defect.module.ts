import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    DefectService,
    DefectPopupService,
    DefectComponent,
    DefectDetailComponent,
    DefectDialogComponent,
    DefectPopupComponent,
    DefectDeletePopupComponent,
    DefectDeleteDialogComponent,
    defectRoute,
    defectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...defectRoute,
    ...defectPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DefectComponent,
        DefectDetailComponent,
        DefectDialogComponent,
        DefectDeleteDialogComponent,
        DefectPopupComponent,
        DefectDeletePopupComponent,
    ],
    entryComponents: [
        DefectComponent,
        DefectDialogComponent,
        DefectPopupComponent,
        DefectDeleteDialogComponent,
        DefectDeletePopupComponent,
    ],
    providers: [
        DefectService,
        DefectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinDefectModule {}
