import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeodinSharedModule } from '../../shared';
import {
    ExploreComponent,
    StudyFullComponent,
    exploreRoute
} from './';

const ENTITY_STATES = [
    ...exploreRoute,
];

@NgModule({
    imports: [
        SeodinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExploreComponent,
        StudyFullComponent,
    ],
    entryComponents: [
        ExploreComponent,
        StudyFullComponent,
    ],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinExploreModule {}
