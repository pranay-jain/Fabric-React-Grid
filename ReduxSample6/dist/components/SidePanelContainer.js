"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const SidePanel_1 = require("./SidePanel");
const SidePanelForm_1 = require("./SidePanelForm");
;
;
;
const mapStateToProps = (state, ownProps) => ({
    showPanel: state.panelContent.showPanel,
    content: state.panelContent.content,
    items: state.items.entries
});
const mapDispatchToProps = (dispatch) => ({
    open: () => {
        dispatch(actions_1.openPanel());
    },
    close: () => {
        dispatch(actions_1.closePanel());
    },
    saveUser: (item, selectedEntry) => {
        dispatch(actions_1.addEntry(item, selectedEntry));
    }
});
class SidePanelContainerComponent extends React.Component {
    _onTextChanged(text, field) {
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
            this.formMarkup = (React.createElement(SidePanelForm_1.default, { onChange: (text, field) => this._onTextChanged(text, field) }));
            if (content === "EDIT_USER") {
                this.displayText = "Enter information to edit user";
            }
            else {
                this.displayText = "Enter your information to add an entry";
            }
        }
        else {
            this.formMarkup = (React.createElement("h2", { className: 'ms-font-m' }, this.props.text));
            this.displayText = 'Here are the details of your selected entry';
        }
    }
    _handleSave() {
        const { content } = this.props;
        let selectedEntry = {};
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
        return (React.createElement(SidePanel_1.default, { showPanel: showPanel, openPanel: this.props.open, closePanel: this.props.close, formMarkup: this.formMarkup, displayText: this.displayText, handleSave: () => this._handleSave() }));
    }
}
exports.SidePanelContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SidePanelContainerComponent);
//# sourceMappingURL=SidePanelContainer.js.map