import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SoftwareSystemDetailComponent } from '../../../../../../main/webapp/app/entities/software-system/software-system-detail.component';
import { SoftwareSystemService } from '../../../../../../main/webapp/app/entities/software-system/software-system.service';
import { SoftwareSystem } from '../../../../../../main/webapp/app/entities/software-system/software-system.model';

describe('Component Tests', () => {

    describe('SoftwareSystem Management Detail Component', () => {
        let comp: SoftwareSystemDetailComponent;
        let fixture: ComponentFixture<SoftwareSystemDetailComponent>;
        let service: SoftwareSystemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [SoftwareSystemDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SoftwareSystemService,
                    EventManager
                ]
            }).overrideTemplate(SoftwareSystemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SoftwareSystemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SoftwareSystemService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SoftwareSystem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.softwareSystem).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
