import * as React from "react";
import * as Redux from "redux";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import thunkMiddleware from "redux-thunk";
import promiseMiddleware from 'redux-promise-middleware';
import { sagas } from './sagas';

import {
    reducers
} from './reducers';
import { Store } from './store';

import { App } from './components/App';
import { NewPage } from './components/NewPage';
import { CounterContainer } from './components/CounterContainer';
import { ContentListContainer } from './components/ContentListContainer';

const history = createHistory();
const middleware = routerMiddleware(history);
// --- SAGA Stuff --------------------------------
const sagaMiddleware = createSagaMiddleware();

//let store: Redux.Store<Store.All> = Redux.createStore(reducers, composeWithDevTools(
//    Redux.applyMiddleware(
//        thunkMiddleware,
//        promiseMiddleware(),
//        middleware)));

let store: Redux.Store<Store.All> = Redux.createStore(reducers, composeWithDevTools(Redux.applyMiddleware(sagaMiddleware, middleware)));
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Route exact path='/' component={ContentListContainer} />
                <Route path='/newpage' component={NewPage} />
            </App>                
        </ConnectedRouter>
    </Provider>, document.getElementById("example"));