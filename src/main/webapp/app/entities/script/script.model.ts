
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Study } from '../study';
export class Script {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public sourceCode?: string,
        public status?: ArtifactStatus,
        public study?: Study,
    ) {
    }
}
