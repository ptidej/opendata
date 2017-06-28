import { Note } from '../note';
import { Video } from '../video';
import { SoftwareSystem } from '../software-system';
import { Developer } from '../developer';
export class ThinkAloud {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public note?: Note,
        public video?: Video,
        public softwareSystem?: SoftwareSystem,
        public developer?: Developer,
    ) {
    }
}
