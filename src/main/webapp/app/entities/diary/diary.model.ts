
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { SoftwareSystem } from '../software-system';
import { Task } from '../task';
import { Developer } from '../developer';
export class Diary {
    constructor(
        public id?: number,
        public uri?: string,
        public status?: ArtifactStatus,
        public softwareSystem?: SoftwareSystem,
        public task?: Task,
        public developer?: Developer,
    ) {
    }
}
