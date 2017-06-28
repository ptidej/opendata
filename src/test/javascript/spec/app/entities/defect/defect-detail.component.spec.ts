import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DefectDetailComponent } from '../../../../../../main/webapp/app/entities/defect/defect-detail.component';
import { DefectService } from '../../../../../../main/webapp/app/entities/defect/defect.service';
import { Defect } from '../../../../../../main/webapp/app/entities/defect/defect.model';

describe('Component Tests', () => {

    describe('Defect Management Detail Component', () => {
        let comp: DefectDetailComponent;
        let fixture: ComponentFixture<DefectDetailComponent>;
        let service: DefectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [DefectDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DefectService,
                    EventManager
                ]
            }).overrideTemplate(DefectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefectService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Defect(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.defect).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
