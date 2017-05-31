import { SoftwareSystem } from '../software-system';
import { Note } from '../note';
import { Video } from '../video';
import { Developer } from '../developer';
export class ThinkAloud {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public registred?: any,
        public softwareSystem?: SoftwareSystem,
        public note?: Note,
        public video?: Video,
        public developer?: Developer,
    ) {
    }
}
