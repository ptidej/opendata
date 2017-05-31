import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiaryDetailComponent } from '../../../../../../main/webapp/app/entities/diary/diary-detail.component';
import { DiaryService } from '../../../../../../main/webapp/app/entities/diary/diary.service';
import { Diary } from '../../../../../../main/webapp/app/entities/diary/diary.model';

describe('Component Tests', () => {

    describe('Diary Management Detail Component', () => {
        let comp: DiaryDetailComponent;
        let fixture: ComponentFixture<DiaryDetailComponent>;
        let service: DiaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [DiaryDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiaryService,
                    EventManager
                ]
            }).overrideTemplate(DiaryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Diary(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.diary).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
