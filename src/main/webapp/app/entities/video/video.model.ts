
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Interview } from '../interview';
import { ThinkAloud } from '../think-aloud';
export class Video {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public duration?: number,
        public uri?: string,
        public status?: ArtifactStatus,
        public recorded?: any,
        public interview?: Interview,
        public thinkaloud?: ThinkAloud,
    ) {
    }
}
