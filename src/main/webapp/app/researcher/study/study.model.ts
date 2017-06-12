import { Developer } from '../../entities/developer';
import { SoftwareSystem } from '../../entities/software-system';
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
