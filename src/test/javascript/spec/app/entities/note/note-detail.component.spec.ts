import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SeodinTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NoteDetailComponent } from '../../../../../../main/webapp/app/entities/note/note-detail.component';
import { NoteService } from '../../../../../../main/webapp/app/entities/note/note.service';
import { Note } from '../../../../../../main/webapp/app/entities/note/note.model';

describe('Component Tests', () => {

    describe('Note Management Detail Component', () => {
        let comp: NoteDetailComponent;
        let fixture: ComponentFixture<NoteDetailComponent>;
        let service: NoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SeodinTestModule],
                declarations: [NoteDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NoteService,
                    EventManager
                ]
            }).overrideTemplate(NoteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Note(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.note).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
