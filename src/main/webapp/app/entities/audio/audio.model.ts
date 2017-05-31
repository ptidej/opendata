
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Interview } from '../interview';
export class Audio {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public duration?: number,
        public uri?: string,
        public status?: ArtifactStatus,
        public interview?: Interview,
    ) {
    }
}
