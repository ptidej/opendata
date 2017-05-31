
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { Task } from '../task';
import { SoftwareSystem } from '../software-system';
import { Developer } from '../developer';
export class Diary {
    constructor(
        public id?: number,
        public uri?: string,
        public registred?: any,
        public status?: ArtifactStatus,
        public task?: Task,
        public softwareSystem?: SoftwareSystem,
        public developer?: Developer,
    ) {
    }
}
