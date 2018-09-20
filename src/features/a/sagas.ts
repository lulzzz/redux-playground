import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';

const fetch = async () => {
    let result = await new Promise((resolve) => setTimeout(() => resolve({ name: 'test-user' }), 1000))
    return result;
}

function* fetchUser(action: AnyAction) {
    try {
        const user = yield call(fetch);
        yield put({ type: "USER_FETCH_SUCCEEDED", payload: { user } });
    } catch (err) {
        yield put({ type: "USER_FETCH_FAILED", err });
    }
}


export function* mySaga() {
    yield takeLatest("addsomething", fetchUser);
}
