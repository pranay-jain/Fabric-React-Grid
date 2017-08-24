import * as React from 'react';
import * as Redux from 'redux';
import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';

import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Store } from '../store';

interface OwnState { }
interface OwnProps { };
interface ConnectedState { };

interface ConnectedDispatch {
    newPage: () => void,
    homePage: () => void

};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({ });

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    newPage: () => {
        dispatch(push('/newpage'));
    },
    homePage: () => {
        dispatch(push('/'));
    }
});


class NavPaneComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    public render() {
        const styles = {
            width: '208px',
            height: '500px',
            boxSizing: 'border-box',
            border: '1px solid #EEE'
        };
        return (
            <div className='ms-NavExample-LeftPane' style={ styles }>
                <Nav
                    groups={
                        [
                            {
                                links:
                                [
                                    {
                                        name: 'Guide',
                                        url: '',                                     
                                        links: [{
                                            name: 'Home Page',
                                            url: '',
                                            onClick: () => this.props.homePage(),
                                            key: 'key1'
                                        },
                                        {
                                            name: 'New Page',
                                            url: '',
                                            onClick: () => this.props.newPage(),
                                            key: 'key2'
                                        }],
                                        isExpanded: true
                                    },
                                    {
                                        name: 'Edit',
                                        url: '',
                                        onClick: () => this.props.newPage(),
                                        icon: 'Edit',
                                        key: 'key8'
                                    }
                                ]
                            }
                        ]
                    }
                    expandedStateText={'expanded'}
                    collapsedStateText={'collapsed'}
                    selectedKey={'key3'}
                />
            </div>
        );
    }
}

export const PageNav: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(NavPaneComponent);