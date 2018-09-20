import { state } from './state'
import { FeatureAElement } from './element';
import { reducerRegistry, actionRegistry } from '../../app';
import actions from './actions';

reducerRegistry.register('a', state);
actionRegistry.registerMap(actions);

customElements.define('feature-a', FeatureAElement);