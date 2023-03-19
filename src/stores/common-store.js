import { action, makeObservable, observable } from 'mobx';

import Base from './base-store';

export default class CommonStore extends Base {
    auth_token = null;

    constructor(root_store) {
        super({ root_store });
        makeObservable(this, {
            auth_token: observable,
            setAuthToken: action,
        });
    }

    setAuthToken(token) {
        this.auth_token = token;
    }
}
