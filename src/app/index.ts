import { BehaviorSubject } from 'rxjs';
import { ViewElement } from './view';

import store from './store';
import view from './view';
import reducerRegistry from './redux/reducerRegistry';
import actionRegistry from './redux/actionRegistry';

const subject = new BehaviorSubject(store.getState());
store.subscribe(() => subject.next(store.getState()));

view(store, document.body);
store.dispatch({ type: 'INIT' });

export { store, reducerRegistry, actionRegistry, ViewElement };

// register the custom element for the features
