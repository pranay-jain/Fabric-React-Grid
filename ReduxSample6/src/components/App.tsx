import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../store';

import { ContentListContainer } from './ContentListContainer';
import { UserCommandBar } from './UserCommandBar';
import { PageNav } from './PageNav';
import {NewPage} from './NewPage';

import { Route, withRouter } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

interface OwnState { };
interface OwnProps { };
interface ConnectedState {
    selectionDetails: string
};

interface ConnectedDispatch { };

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    selectionDetails: state.items.selectionState
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({ });

class AppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, any> {
    render() {
        const { selectionDetails } = this.props;
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2">
                        <PageNav />
                    </div>
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg10">
                         {this.props.children}
                    </div>
                </div>                
            </div>
        );
    }
}

const AppTemp: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export const App = withRouter(AppTemp);
