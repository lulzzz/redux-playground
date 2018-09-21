import { AnyAction } from "redux";
import { A_LOAD, A_LOAD_ASYNC } from './actions';
export function state(state = { title: 'feature A', description: 'Feature A Description' }, action: AnyAction) {
    switch (action.type.toUpperCase()) {
        case A_LOAD_ASYNC.SUCCESS:
            return Object.assign({}, state, { ...action.payload }, { date: Date.now() });
        default: return state;
    }
};