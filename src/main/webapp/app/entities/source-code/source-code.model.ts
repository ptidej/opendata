
const enum ArtifactStatus {
    'PRIVATE',
    'SUBMITED',
    'PUBLISHED'

};
import { DesignPattern } from '../design-pattern';
import { SoftwareSystem } from '../software-system';
export class SourceCode {
    constructor(
        public id?: number,
        public tag?: string,
        public uri?: string,
        public status?: ArtifactStatus,
        public designPattern?: DesignPattern,
        public softwareSystem?: SoftwareSystem,
    ) {
    }
}
