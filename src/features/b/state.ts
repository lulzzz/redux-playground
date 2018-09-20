import { Action, Dispatch } from "redux";

export function state(state = { title: 'feature B', description: 'Feature B Description' }, action: Action) {
    console.log(`--- action called on feature B: ${action.type}`);
    return state;
};