import { Action, AnyAction } from "redux";

export function state(state = { title: 'feature A', description: 'Feature A Description' }, action: AnyAction) {
    console.log(`--- action called on feature A: ${action.type}`, action);

    switch (action.type.toUpperCase()) {
        case "ADDSOMETHING":
        case "USER_FETCH_SUCCEEDED":
            return Object.assign({}, state, { ...action.payload }, { date: Date.now() });
        default: return state;
    }

};