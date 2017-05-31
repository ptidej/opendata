import { Interview } from '../interview';
import { Diary } from '../diary';
import { ThinkAloud } from '../think-aloud';
import { Defect } from '../defect';
import { TestCase } from '../test-case';
import { InteractiveLog } from '../interactive-log';
import { Study } from '../study';
export class Developer {
    constructor(
        public id?: number,
        public name?: string,
        public interview?: Interview,
        public diary?: Diary,
        public thinkAloud?: ThinkAloud,
        public defect?: Defect,
        public testCase?: TestCase,
        public interactiveLog?: InteractiveLog,
        public study?: Study,
    ) {
    }
}
