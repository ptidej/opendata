import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SourceCodeDetailComponent } from '../../../../../../main/webapp/app/entities/source-code/source-code-detail.component';
import { SourceCodeService } from '../../../../../../main/webapp/app/entities/source-code/source-code.service';
import { SourceCode } from '../../../../../../main/webapp/app/entities/source-code/source-code.model';

describe('Component Tests', () => {

    describe('SourceCode Management Detail Component', () => {
        let comp: SourceCodeDetailComponent;
        let fixture: ComponentFixture<SourceCodeDetailComponent>;
        let service: SourceCodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [SourceCodeDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SourceCodeService,
                    EventManager
                ]
            }).overrideTemplate(SourceCodeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceCodeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceCodeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SourceCode(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sourceCode).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
