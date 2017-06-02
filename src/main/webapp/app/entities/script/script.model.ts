
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
export class Script {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public sourceCode?: string,
        public status?: ArtifactStatus,
    ) {
    }
}
