import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../store';

import { ContentListContainer } from './ContentListContainer';
import { UserCommandBar } from './UserCommandBar';
import { PageNav } from './PageNav';

interface OwnState { };
interface OwnProps { };
interface ConnectedState {
    selectionDetails: string
};

interface ConnectedDispatch { };

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    selectionDetails: state.items.selectionState
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({});

class AppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    render() {
        const { selectionDetails } = this.props;
        return (
            <div>
                <UserCommandBar text={selectionDetails} />
                <h2>This is a new page. </h2>
            </div>
        );
    }
}

export const NewPage: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
