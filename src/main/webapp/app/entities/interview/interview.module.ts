import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    InterviewService,
    InterviewPopupService,
    InterviewComponent,
    InterviewDetailComponent,
    InterviewDialogComponent,
    InterviewPopupComponent,
    InterviewDeletePopupComponent,
    InterviewDeleteDialogComponent,
    InterviewSearchPopupComponent,
    InterviewSearchDialogComponent,
    interviewRoute,
    interviewPopupRoute,
} from './';

const ENTITY_STATES = [
    ...interviewRoute,
    ...interviewPopupRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InterviewComponent,
        InterviewDetailComponent,
        InterviewDialogComponent,
        InterviewDeleteDialogComponent,
        InterviewPopupComponent,
        InterviewDeletePopupComponent,
        InterviewSearchPopupComponent,
        InterviewSearchDialogComponent,
    ],
    entryComponents: [
        InterviewComponent,
        InterviewDialogComponent,
        InterviewPopupComponent,
        InterviewDeleteDialogComponent,
        InterviewDeletePopupComponent,
        InterviewSearchPopupComponent,
        InterviewSearchDialogComponent,
    ],
    providers: [
        InterviewService,
        InterviewPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinInterviewModule {}
