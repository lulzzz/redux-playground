import { Action } from "rxjs/internal/scheduler/Action";
import { AnyAction } from "redux";


export interface Entry {
    (): any;
}

export interface ActionFunction<T> {
    (T?: any): AnyAction
}


export interface Entries {
    [key: string]: Entry;
}

class ActionRegistry {

    constructor(private entries: Entries = {}) {

    }

    register(name: string, entry: Entry) {
        console.log('register', name, entry)
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