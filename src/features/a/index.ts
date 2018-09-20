import { state } from './state'
import { FeatureAElement } from './element';
import { reducerRegistry } from '../../app';

reducerRegistry.register('a', state);

customElements.define('feature-a', FeatureAElement);