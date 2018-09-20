import { Reducer } from "redux";

interface ChangeListener {
    (reducers: Reducers): void;
}

export interface Reducers {
    [key: string]: Reducer
}

export class Registry {
    constructor(private reducers: Reducers = {}, private listener: ChangeListener = null) {

    }

    get entries() {
        return { ...this.reducers };
    }

    register(name: string, reducer: Reducer) {
        this.reducers = { ...this.reducers, [name]: reducer };
        if (this.listener) {
            this.listener(this.reducers);
        }
    }

    setChangeListener(listener: ChangeListener) {
        this.listener = listener;
    }

}

export default new Registry();