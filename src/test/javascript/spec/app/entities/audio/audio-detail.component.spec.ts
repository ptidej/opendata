import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AudioDetailComponent } from '../../../../../../main/webapp/app/entities/audio/audio-detail.component';
import { AudioService } from '../../../../../../main/webapp/app/entities/audio/audio.service';
import { Audio } from '../../../../../../main/webapp/app/entities/audio/audio.model';

describe('Component Tests', () => {

    describe('Audio Management Detail Component', () => {
        let comp: AudioDetailComponent;
        let fixture: ComponentFixture<AudioDetailComponent>;
        let service: AudioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [AudioDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AudioService,
                    EventManager
                ]
            }).overrideTemplate(AudioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AudioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AudioService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Audio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.audio).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
