import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SeodinStudyModule } from '../entities/study/study.module';
import { SeodinSoftwareSystemModule } from '../entities/software-system/software-system.module';
import { SeodinTaskModule } from '../entities/task/task.module';
import { SeodinDeveloperModule } from '../entities/developer/developer.module';
import { SeodinInterviewModule } from '../entities/interview/interview.module';
import { SeodinThinkAloudModule } from '../entities/think-aloud/think-aloud.module';
import { SeodinDiaryModule } from '../entities/diary/diary.module';
import { SeodinAudioModule } from '../entities/audio/audio.module';
import { SeodinVideoModule } from '../entities/video/video.module';
import { SeodinNoteModule } from '../entities/note/note.module';
import { SeodinDefectModule } from '../entities/defect/defect.module';
import { SeodinTestCaseModule } from '../entities/test-case/test-case.module';
import { SeodinInteractiveLogModule } from '../entities/interactive-log/interactive-log.module';
import { SeodinSourceCodeModule } from '../entities/source-code/source-code.module';
import { SeodinDesignPatternModule } from '../entities/design-pattern/design-pattern.module';
import { SeodinScriptModule } from '../entities/script/script.module';

@NgModule({
    imports: [
        SeodinStudyModule,
        SeodinSoftwareSystemModule,
        SeodinTaskModule,
        SeodinDeveloperModule,
        SeodinInterviewModule,
        SeodinThinkAloudModule,
        SeodinDiaryModule,
        SeodinAudioModule,
        SeodinVideoModule,
        SeodinNoteModule,
        SeodinDefectModule,
        SeodinTestCaseModule,
        SeodinInteractiveLogModule,
        SeodinSourceCodeModule,
        SeodinDesignPatternModule,
        SeodinScriptModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeodinResearcherModule {}
