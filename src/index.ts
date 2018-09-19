import { BehaviorSubject } from 'rxjs';

import createStore from './store';
import view from './view';

import { FeatureAElement } from './features/a';
import { FeatureBElement } from './features/b';

const store = createStore();
const subject = new BehaviorSubject(store.getState());
store.subscribe(() => subject.next(store.getState()));

view(store, document.body);
// lets create the custom elements
customElements.define('feature-a', FeatureAElement);
customElements.define('feature-b', FeatureBElement);
store.dispatch({ type: 'INIT' });

// register the custom element for the features
