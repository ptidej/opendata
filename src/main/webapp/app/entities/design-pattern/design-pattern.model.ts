
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { SourceCode } from '../source-code';
export class DesignPattern {
    constructor(
        public id?: number,
        public tag?: string,
        public xmlDescriptor?: string,
        public status?: ArtifactStatus,
        public sourceCode?: SourceCode,
    ) {
    }
}
