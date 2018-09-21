
import { AnyAction } from "redux";


export interface ActionFunction<T> {
    (T?: any): AnyAction
}


export interface Entries {
    [key: string]: ActionFunction<any>;
}

class ActionRegistry {

    constructor(private entries: Entries = {}) {

    }

    register<T>(name: string, entry: ActionFunction<T>) {
        this.entries = { ...this.entries, [name]: entry };
    }

    registerMap(entries: Entries) {
        this.entries = Object.assign(this.entries, entries);
    }

    resolve<T>(name: string): ActionFunction<T> {
        return this.entries[name];
    }

}

export default new ActionRegistry();