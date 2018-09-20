import { state } from './state'
import { FeatureBElement } from './element';
import { reducerRegistry } from '../../app';

reducerRegistry.register('b', state);
customElements.define('feature-b', FeatureBElement);