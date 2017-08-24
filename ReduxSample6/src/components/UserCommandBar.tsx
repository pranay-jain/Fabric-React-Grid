import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../store';
import { openPanel, closePanel, addUser } from '../actions';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

interface OwnState { }
interface OwnProps {
    text:string
};
interface ConnectedState {};

interface ConnectedDispatch {
    displayForm: () => void
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    displayForm: () => {
        dispatch(addUser());
    }
});

class CommandBarNonFocusableItemsExample extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    public render() {
        let itemsNonFocusable: any[] = [
            {
                key: 'newItem',
                name: 'New',
                icon: 'Add',
                ariaLabel: 'New. Use left and right arrow keys to navigate',
                onClick: () => { return; },
                items: [
                    {
                        key: 'addUser',
                        name: this.props.text === '' || this.props.text === 'No items selected'
                                            ? 'Add New User' : 'Edit Selected User',
                        icon: 'Add',
                        onClick: () => { this.props.displayForm(); },
                    }
                ]
            }
        ];

        return (
            <div>
                <CommandBar
                    isSearchBoxVisible={true}
                    items={itemsNonFocusable}
                />
            </div>
        );
    }

}

export const UserCommandBar: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(CommandBarNonFocusableItemsExample);