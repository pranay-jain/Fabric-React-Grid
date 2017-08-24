"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
exports.incrementCounter = (delta) => ({
    type: "INCREMENT_COUNTER",
    delta,
});
exports.resetCounter = () => ({
    type: "RESET_COUNTER",
});
const _saveCount = {
    request: (request) => ({ type: "SAVE_COUNT_REQUEST", request }),
    success: (response, request) => ({ type: "SAVE_COUNT_SUCCESS", request, response }),
    error: (error, request) => ({ type: "SAVE_COUNT_ERROR", request, error }),
};
const _loadCount = {
    request: (request) => ({ type: "LOAD_COUNT_REQUEST", request: null }),
    success: (response, request) => ({ type: "LOAD_COUNT_SUCCESS", request: null, response }),
    error: (error, request) => ({ type: "LOAD_COUNT_ERROR", request: null, error }),
};
function apiActionGroupFactory(x, go) {
    return (request) => (dispatch) => {
        dispatch(x.request(request));
        go(request)
            .then((response) => dispatch(x.success(response, request)))
            .catch((e) => dispatch(x.error(e, request)));
    };
}
exports.saveCount = apiActionGroupFactory(_saveCount, api_1.api.save);
exports.loadCount = () => apiActionGroupFactory(_loadCount, api_1.api.load)(null);
//# sourceMappingURL=CounterActions.js.map