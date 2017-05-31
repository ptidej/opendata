
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};

const enum Resolution {
    'NONE',
    'FIXED',
    'WONTFIX'

};

const enum Severity {
    'NONE'

};

const enum Priority {
    'MINOR',
    'MAJOR',
    'CRITICAL'

};
import { Developer } from '../developer';
export class Defect {
    constructor(
        public id?: number,
        public ticket?: string,
        public summary?: string,
        public description?: string,
        public status?: ArtifactStatus,
        public resolution?: Resolution,
        public severity?: Severity,
        public priority?: Priority,
        public created?: any,
        public modified?: any,
        public developer?: Developer,
    ) {
    }
}
