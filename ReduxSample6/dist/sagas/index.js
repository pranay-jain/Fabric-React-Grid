"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const UserGridMiddleware_1 = require("./UserGridMiddleware");
function* sagas() {
    console.log("sagas");
    yield effects_1.takeEvery('USERS_FETCH', UserGridMiddleware_1.fetchData);
    //yield all([
    //    fork(takeLatest, 'USERS_FETCH', fetch),
    //    // TODO: add forks for any sagas
    //])
}
exports.sagas = sagas;
//# sourceMappingURL=index.js.map