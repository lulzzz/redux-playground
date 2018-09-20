import { Action, AnyAction } from "redux";

export function state(state = { title: 'feature A', description: 'Feature A Description' }, action: AnyAction) {
    console.log(`--- action called on feature A: ${action.type}`);

    if (action.type === 'addsomething') {
        console.log('ADD SOMETHING WITH THIS REDUCER!!!', action.payload);
        return Object.assign({}, state, { ...action.payload }, { date: Date.now() });
    }

    return state;
};