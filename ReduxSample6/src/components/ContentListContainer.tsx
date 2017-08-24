import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../store';
import { addEntry, getSelectionState, fetchUserData } from '../actions';
import ContentList from "./ContentList";

import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { UserCommandBar } from './UserCommandBar';

interface OwnState { };
interface OwnProps { };
interface ConnectedState {
    items: any[],
    selectionDetails: string
};

interface ConnectedDispatch {
    getSelectionState: (getFunction: string) => void,
    fetchUserData: (url: string, start: number) => void
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    items: state.items.entries,
    selectionDetails: state.items.selectionState
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    getSelectionState: (getFunction) => {
        dispatch(getSelectionState(getFunction));
    },
    fetchUserData: (url: string, start: number) => {
        dispatch(fetchUserData(url, start))
    }
});

class GridComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    private _selection: Selection;
    
    constructor() {
        super();

        this._selection = new Selection({
            onSelectionChanged: () => this.props.getSelectionState(this._getSelectionDetails())
        });
    }

    render() {
        const { items, selectionDetails } = this.props;
        return (
            <div>
                <UserCommandBar text={selectionDetails} />
                <ContentList items={items} selectionDetails={selectionDetails} selection={this._selection} />
            </div>
        );
    }

    _getSelectionDetails(): string {
        let selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:               
                return '1 item selected: ' + (this._selection.getSelection()[0] as any).fname + ': ' + (this._selection.getSelection()[0] as any).username;
            default:
                return '' + selectionCount + ' items selected';
        }
    }
}

export const ContentListContainer: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(GridComponent);