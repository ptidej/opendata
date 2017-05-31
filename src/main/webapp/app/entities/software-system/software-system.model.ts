import { SourceCode } from '../source-code';
import { Study } from '../study';
export class SoftwareSystem {
    constructor(
        public id?: number,
        public tag?: string,
        public sourceCode?: SourceCode,
        public study?: Study,
    ) {
    }
}
