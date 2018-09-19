import { Action } from "redux";

export function state(state = {title: 'feature A', description: 'Feature A Description'}, action: Action) {
    console.log(`--- action called on feature A: ${action.type}`);
    return state;
};