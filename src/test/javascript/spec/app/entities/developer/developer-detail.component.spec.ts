import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DeveloperDetailComponent } from '../../../../../../main/webapp/app/entities/developer/developer-detail.component';
import { DeveloperService } from '../../../../../../main/webapp/app/entities/developer/developer.service';
import { Developer } from '../../../../../../main/webapp/app/entities/developer/developer.model';

describe('Component Tests', () => {

    describe('Developer Management Detail Component', () => {
        let comp: DeveloperDetailComponent;
        let fixture: ComponentFixture<DeveloperDetailComponent>;
        let service: DeveloperService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [DeveloperDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DeveloperService,
                    EventManager
                ]
            }).overrideTemplate(DeveloperDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeveloperDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeveloperService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Developer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.developer).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
