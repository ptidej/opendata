
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};

const enum Resolution {
    'NONE',
    'FIXED',
    'WONTFIX',
    'INVALID'

};

const enum Severity {
    'NONE'

};

const enum Priority {
    'MINOR',
    'MAJOR',
    'CRITICAL',
    'BLOCKER'

};
import { Developer } from '../developer';
export class Defect {
    constructor(
        public id?: number,
        public ticket?: string,
        public summary?: string,
        public description?: any,
        public status?: ArtifactStatus,
        public resolution?: Resolution,
        public severity?: Severity,
        public priority?: Priority,
        public recorded?: any,
        public modified?: any,
        public developer?: Developer,
    ) {
    }
}
