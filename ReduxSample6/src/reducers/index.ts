import { combineReducers } from "redux";
import { Store } from '../store';
import { counter } from './CounterReducers';
import { gridSetup } from './UserGridReducers';
import { togglePanel } from './SidePanelReducers';
import { routerReducer } from 'react-router-redux';

export const reducers = combineReducers<Store.All>({
    counter,
    items: gridSetup,
    panelContent: togglePanel,
    router: routerReducer
});
