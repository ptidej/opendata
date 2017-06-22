
const enum LogKind {
    'SELECTION',
    'COMMAND',
    'PREFERENCE'

};

const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Developer } from '../developer';
export class InteractiveLog {
    constructor(
        public id?: number,
        public kind?: LogKind,
        public sourceHandle?: string,
        public origin?: string,
        public delta?: string,
        public recorded?: any,
        public status?: ArtifactStatus,
        public developer?: Developer,
    ) {
    }
}
