import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../store';
import { openPanel, closePanel, addEntry } from '../actions';

import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import SidePanel from './SidePanel';
import SidePanelForm from './SidePanelForm';

interface OwnState { }
interface OwnProps {
    text: string,
    selectedEntry: any
};
interface ConnectedState {
    showPanel: boolean,
    content: string,
    items: any[]
};

interface ConnectedDispatch {
    open: () => void,
    close: () => void,
    saveUser: (item: any, selectedEntry: any) => void
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    showPanel: state.panelContent.showPanel,
    content: state.panelContent.content,
    items: state.items.entries
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    open: () => {
        dispatch(openPanel());
    },
    close: () => {
        dispatch(closePanel());
    },
    saveUser: (item: any, selectedEntry: any) => {
        dispatch(addEntry(item, selectedEntry));
    }
});

class SidePanelContainerComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {
    private formMarkup: any;
    private displayText: string;
    private firstname: string;
    private lastname: string;
    private email: string;

    _onTextChanged(text: string, field: string) {
        if (field === "fname")
            this.firstname = text;
        else if (field === "lname")
            this.lastname = text;
        else
            this.email = text;
    }

    _getPanelMarkup() {
        const { content } = this.props;
        console.log("in get markup", this);
        if (content === "ADD_USER" || content === "EDIT_USER") {
            this.formMarkup = (
                <SidePanelForm onChange={(text, field) => this._onTextChanged(text, field)} />
            );

            if (content === "EDIT_USER") {
                this.displayText = "Enter information to edit user";
            } else {
                this.displayText = "Enter your information to add an entry";
            }
        } else {
            this.formMarkup = (
                <h2 className='ms-font-m'>{this.props.text}</h2>
            );
            this.displayText = 'Here are the details of your selected entry'
        }        
    }

    _handleSave() {
        const { content } = this.props;
        let selectedEntry: any = {};

        const item = {
            key: this.props.items.length + 1,
            fname: this.firstname,
            lname: this.lastname,
            username: new Date().getTime(),
            email: this.email
        };        

        this.firstname = '';
        this.lastname = '';
        this.email = '';


        if (this.props.text.indexOf('1') === 0) {
            selectedEntry = this.props.selectedEntry.getSelection()[0];
        }

        this.props.saveUser(item, selectedEntry);
        this.props.close();
    }

    render() {
        const { showPanel, content } = this.props;
        this._getPanelMarkup();
        return (
            <SidePanel showPanel={showPanel} openPanel={this.props.open} closePanel={this.props.close} formMarkup={this.formMarkup} displayText={this.displayText} handleSave={() => this._handleSave()} />
        );
    }
}
export const SidePanelContainer: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(SidePanelContainerComponent);