import { takeLatest, takeEvery, take, fork, all } from 'redux-saga/effects';
import { fetchData } from './UserGridMiddleware';

export function* sagas(): any {
    console.log("sagas");
    yield takeEvery('USERS_FETCH', fetchData);
    //yield all([
    //    fork(takeLatest, 'USERS_FETCH', fetch),
    //    // TODO: add forks for any sagas
    //])
}

