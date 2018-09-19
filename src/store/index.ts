

import { createStore, combineReducers, applyMiddleware, Store, Dispatch, AnyAction } from 'redux'
import * as a from '../features/a';
import * as b from '../features/b';

import thunkMiddleware from 'redux-thunk';

const logger = (store: Store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
};

export default function configureStore() {
    return createStore(
        combineReducers({ a: a.state, b: b.state }),
        applyMiddleware(thunkMiddleware, logger));
}