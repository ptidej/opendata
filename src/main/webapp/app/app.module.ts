import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { SeodinSharedModule, UserRouteAccessService } from './shared';
import { SeodinHomeModule } from './home/home.module';
import { SeodinAdminModule } from './admin/admin.module';
import { SeodinAccountModule } from './account/account.module';
import { SeodinEntityModule } from './entities/entity.module';
import { SeodinResearcherModule } from './researcher/researcher.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SeodinSharedModule,
        SeodinHomeModule,
        SeodinAdminModule,
        SeodinAccountModule,
        SeodinEntityModule,
        SeodinResearcherModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SeodinAppModule {}
