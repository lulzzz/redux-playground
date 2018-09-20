import { Store, Dispatch, AnyAction, Action } from 'redux'
const logger = (store: Store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
};

export default logger;