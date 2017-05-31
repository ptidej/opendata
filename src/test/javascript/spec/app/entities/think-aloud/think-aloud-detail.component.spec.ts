import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ThinkAloudDetailComponent } from '../../../../../../main/webapp/app/entities/think-aloud/think-aloud-detail.component';
import { ThinkAloudService } from '../../../../../../main/webapp/app/entities/think-aloud/think-aloud.service';
import { ThinkAloud } from '../../../../../../main/webapp/app/entities/think-aloud/think-aloud.model';

describe('Component Tests', () => {

    describe('ThinkAloud Management Detail Component', () => {
        let comp: ThinkAloudDetailComponent;
        let fixture: ComponentFixture<ThinkAloudDetailComponent>;
        let service: ThinkAloudService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [ThinkAloudDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ThinkAloudService,
                    EventManager
                ]
            }).overrideTemplate(ThinkAloudDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThinkAloudDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThinkAloudService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ThinkAloud(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.thinkAloud).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
