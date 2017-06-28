import { SourceCode } from '../source-code';
import { Diary } from '../diary';
import { TestCase } from '../test-case';
import { ThinkAloud } from '../think-aloud';
import { Study } from '../study';
export class SoftwareSystem {
    constructor(
        public id?: number,
        public tag?: string,
        public sourceCode?: SourceCode,
        public diary?: Diary,
        public testCase?: TestCase,
        public thinkAloud?: ThinkAloud,
        public study?: Study,
    ) {
    }
}
