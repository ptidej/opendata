import { Diary } from '../diary';
import { Study } from '../study';
export class Task {
    constructor(
        public id?: number,
        public tag?: string,
        public diary?: Diary,
        public study?: Study,
    ) {
    }
}
