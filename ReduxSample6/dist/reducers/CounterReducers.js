"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    value: 0,
};
exports.counter = (state = initialState, action) => {
    const { value } = state;
    switch (action.type) {
        case "INCREMENT_COUNTER":
            const newValue = value + action.delta;
            return { value: newValue };
        case "RESET_COUNTER":
            return { value: 0 };
        default:
            return state;
    }
};
//# sourceMappingURL=CounterReducers.js.map