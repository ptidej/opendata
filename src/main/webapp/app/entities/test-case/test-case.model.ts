
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { SoftwareSystem } from '../software-system';
import { Developer } from '../developer';
export class TestCase {
    constructor(
        public id?: number,
        public tag?: string,
        public uri?: string,
        public status?: ArtifactStatus,
        public softwareSystem?: SoftwareSystem,
        public developer?: Developer,
    ) {
    }
}
