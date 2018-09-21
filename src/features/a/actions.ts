import { createAction } from 'redux-actions';
import { createAsyncTypes } from '../../app/redux/actions';

export const A_LOAD = 'A_LOAD';
export const A_LOAD_ASYNC = createAsyncTypes(A_LOAD);

const load = createAction(A_LOAD, (data: any = {}) => data);

export default {
    [A_LOAD]: load
};