import { state } from './state'
import { FeatureAElement } from './element';
import { reducerRegistry, actionRegistry, sagaMiddleware } from '../../app';
import actions from './actions';
import { mySaga } from './sagas';

reducerRegistry.register('a', state);
actionRegistry.registerMap(actions);
sagaMiddleware.run(mySaga)

customElements.define('feature-a', FeatureAElement);