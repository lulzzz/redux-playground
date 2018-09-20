import { BehaviorSubject } from 'rxjs';
export { ViewElement } from './view';

import { store, sagaMiddleware } from './store';
import view from './view';
import reducerRegistry from './redux/reducerRegistry';
import actionRegistry, { Entry, Entries } from './redux/actionRegistry';
import { Reducer } from 'redux';

const subject = new BehaviorSubject(store.getState());
store.subscribe(() => subject.next(store.getState()));

view(store, document.body);


export interface App {
    action(name: string, entry: Entry): App;
    actions(entries: Entries): App;
    reducer(name: string, reducer: Reducer): App;
    saga(entry: () => Iterator<any>): App;
};

const app: App = {
    action(name: string, entry: Entry): App {
        actionRegistry.register(name, entry);
        return this;
    },
    actions(entries: Entries): App {
        actionRegistry.registerMap(entries);
        return this;
    },
    reducer(name: string, reducer: Reducer): App {
        reducerRegistry.register(name, reducer);
        return this;
    },
    saga(entry: () => Iterator<any>): App {
        sagaMiddleware.run(entry);
        return this;
    }
}

export default app;
// register the custom element for the features
