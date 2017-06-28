import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DesignPatternDetailComponent } from '../../../../../../main/webapp/app/entities/design-pattern/design-pattern-detail.component';
import { DesignPatternService } from '../../../../../../main/webapp/app/entities/design-pattern/design-pattern.service';
import { DesignPattern } from '../../../../../../main/webapp/app/entities/design-pattern/design-pattern.model';

describe('Component Tests', () => {

    describe('DesignPattern Management Detail Component', () => {
        let comp: DesignPatternDetailComponent;
        let fixture: ComponentFixture<DesignPatternDetailComponent>;
        let service: DesignPatternService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [DesignPatternDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DesignPatternService,
                    EventManager
                ]
            }).overrideTemplate(DesignPatternDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DesignPatternDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DesignPatternService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DesignPattern(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.designPattern).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
