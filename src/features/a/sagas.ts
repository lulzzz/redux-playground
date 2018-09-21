import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { A_LOAD, A_LOAD_ASYNC } from './actions';
import designService from './services/designService';

const fetch = async () => {
    let result = await new Promise((resolve) => setTimeout(() => resolve({ name: 'test-user' }), 1000))
    return result;
}

function* loadDesignDefinition(action: AnyAction) {

    yield put({ type: A_LOAD_ASYNC.PENDING });
    const design = yield call(() => designService.load());
    yield put({ type: A_LOAD_ASYNC.SUCCESS, payload: { design } });
}


export function* loadDesign() {
    yield takeLatest(A_LOAD, loadDesignDefinition);
}
