"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Redux = require("redux");
const ReactDOM = require("react-dom");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const createBrowserHistory_1 = require("history/createBrowserHistory");
const react_router_redux_1 = require("react-router-redux");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const redux_saga_1 = require("redux-saga");
const sagas_1 = require("./sagas");
const reducers_1 = require("./reducers");
const App_1 = require("./components/App");
const NewPage_1 = require("./components/NewPage");
const ContentListContainer_1 = require("./components/ContentListContainer");
const history = createBrowserHistory_1.default();
const middleware = react_router_redux_1.routerMiddleware(history);
// --- SAGA Stuff --------------------------------
const sagaMiddleware = redux_saga_1.default();
//let store: Redux.Store<Store.All> = Redux.createStore(reducers, composeWithDevTools(
//    Redux.applyMiddleware(
//        thunkMiddleware,
//        promiseMiddleware(),
//        middleware)));
let store = Redux.createStore(reducers_1.reducers, redux_devtools_extension_1.composeWithDevTools(Redux.applyMiddleware(sagaMiddleware, middleware)));
sagaMiddleware.run(sagas_1.sagas);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_redux_1.ConnectedRouter, { history: history },
        React.createElement(App_1.App, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: ContentListContainer_1.ContentListContainer }),
            React.createElement(react_router_dom_1.Route, { path: '/newpage', component: NewPage_1.NewPage })))), document.getElementById("example"));
//# sourceMappingURL=index.js.map