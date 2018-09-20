import { Action } from "redux";

export function state(state = { title: 'feature A', description: 'Feature A Description' }, action: Action) {
    console.log(`--- action called on feature A: ${action.type}`);

    if (action.type === 'addsomething') {
        console.log('ADD SOMETHING WITH THIS REDUCER!!!');
        return Object.assign({}, state, { date: Date.now() });
    }

    return state;
};