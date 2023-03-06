import CommonStore from './common-store';

export class RootStore {
    constructor() {
        this.common_store = new CommonStore(this);
    }
}
