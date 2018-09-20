import { state } from './state'
import { FeatureAElement } from './element';
import app from '../../app';
import actions from './actions';
import { mySaga } from './sagas';

app.reducer('a', state)
    .actions(actions)
    .saga(mySaga);

customElements.define('feature-a', FeatureAElement);