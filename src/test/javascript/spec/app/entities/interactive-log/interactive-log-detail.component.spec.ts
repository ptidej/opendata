import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InteractiveLogDetailComponent } from '../../../../../../main/webapp/app/entities/interactive-log/interactive-log-detail.component';
import { InteractiveLogService } from '../../../../../../main/webapp/app/entities/interactive-log/interactive-log.service';
import { InteractiveLog } from '../../../../../../main/webapp/app/entities/interactive-log/interactive-log.model';

describe('Component Tests', () => {

    describe('InteractiveLog Management Detail Component', () => {
        let comp: InteractiveLogDetailComponent;
        let fixture: ComponentFixture<InteractiveLogDetailComponent>;
        let service: InteractiveLogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [InteractiveLogDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InteractiveLogService,
                    EventManager
                ]
            }).overrideTemplate(InteractiveLogDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InteractiveLogDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteractiveLogService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new InteractiveLog(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.interactiveLog).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
