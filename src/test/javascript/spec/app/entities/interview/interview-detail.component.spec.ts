import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InterviewDetailComponent } from '../../../../../../main/webapp/app/entities/interview/interview-detail.component';
import { InterviewService } from '../../../../../../main/webapp/app/entities/interview/interview.service';
import { Interview } from '../../../../../../main/webapp/app/entities/interview/interview.model';

describe('Component Tests', () => {

    describe('Interview Management Detail Component', () => {
        let comp: InterviewDetailComponent;
        let fixture: ComponentFixture<InterviewDetailComponent>;
        let service: InterviewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [InterviewDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InterviewService,
                    EventManager
                ]
            }).overrideTemplate(InterviewDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Interview(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.interview).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
