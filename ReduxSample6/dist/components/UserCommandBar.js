"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
;
;
;
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    displayForm: () => {
        dispatch(actions_1.addUser());
    }
});
class CommandBarNonFocusableItemsExample extends React.Component {
    render() {
        let itemsNonFocusable = [
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
        return (React.createElement("div", null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: true, items: itemsNonFocusable })));
    }
}
exports.UserCommandBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CommandBarNonFocusableItemsExample);
//# sourceMappingURL=UserCommandBar.js.map