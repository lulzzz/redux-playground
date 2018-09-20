import { state } from './state'
import { FeatureBElement } from './element';
import app from '../../app';

app.reducer('b', state);
customElements.define('feature-b', FeatureBElement);