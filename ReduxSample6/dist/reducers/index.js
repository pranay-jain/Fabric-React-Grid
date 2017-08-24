"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const CounterReducers_1 = require("./CounterReducers");
const UserGridReducers_1 = require("./UserGridReducers");
const SidePanelReducers_1 = require("./SidePanelReducers");
const react_router_redux_1 = require("react-router-redux");
exports.reducers = redux_1.combineReducers({
    counter: CounterReducers_1.counter,
    items: UserGridReducers_1.gridSetup,
    panelContent: SidePanelReducers_1.togglePanel,
    router: react_router_redux_1.routerReducer
});
//# sourceMappingURL=index.js.map