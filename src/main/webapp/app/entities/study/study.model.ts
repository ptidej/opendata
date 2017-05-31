import { Developer } from '../developer';
import { SoftwareSystem } from '../software-system';
export class Study {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public author?: string,
        public developer?: Developer,
        public softwareSystem?: SoftwareSystem,
    ) {
    }
}
