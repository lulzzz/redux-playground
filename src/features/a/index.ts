import { state } from './state'
import { FeatureAElement } from './element';
import app from '../../app';
import actions, { A_LOAD } from './actions';
import { loadDesign } from './sagas';

customElements.define('feature-a', FeatureAElement);

app.reducer('a', state)
    .actions(actions)
    .saga(loadDesign);

(async () => {
    /**
     * lazy load feature B which we need to do based on feature enabled or not
     */
    let mod = await import(/* webpackChunkName: "feature_b" */'../b');
    // load the thing
    app.store.dispatch(actions[A_LOAD]());
})();