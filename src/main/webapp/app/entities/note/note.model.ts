
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Interview } from '../interview';
import { ThinkAloud } from '../think-aloud';
export class Note {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public uri?: string,
        public status?: ArtifactStatus,
        public interview?: Interview,
        public thinkaloud?: ThinkAloud,
    ) {
    }
}
