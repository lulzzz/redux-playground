

import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { Reducers } from '../redux/reducerRegistry';

import reducerRegistry from '../redux/reducerRegistry';
import logger from '../redux/logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {};// load from storage
const combine = (reducers: Reducers) => {
    const reducerNames = Object.keys(reducers);
    if (reducerNames.length <= 0) {
        return (state: any, action: Action) => state;
    }
    Object.keys(initialState).forEach(item => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state: any, action: Action) => state;
        }
    });
    return combineReducers(reducers);
};

const reducer = combine(reducerRegistry.entries);
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware, logger));

reducerRegistry.setChangeListener((reducers: Reducers) => store.replaceReducer(combine(reducers)));

export default store;