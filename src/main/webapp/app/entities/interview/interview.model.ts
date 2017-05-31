import { Audio } from '../audio';
import { Video } from '../video';
import { Note } from '../note';
import { Developer } from '../developer';
export class Interview {
    constructor(
        public id?: number,
        public tag?: string,
        public description?: string,
        public registred?: any,
        public audio?: Audio,
        public video?: Video,
        public note?: Note,
        public developer?: Developer,
    ) {
    }
}
