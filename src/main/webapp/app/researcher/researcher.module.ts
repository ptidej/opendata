import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SeodinExploreModule } from './explore/explore.module';

@NgModule({
    imports: [
        SeodinExploreModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinResearcherModule {}
