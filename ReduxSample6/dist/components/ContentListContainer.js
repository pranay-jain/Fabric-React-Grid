"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const ContentList_1 = require("./ContentList");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const UserCommandBar_1 = require("./UserCommandBar");
;
;
;
;
const mapStateToProps = (state, ownProps) => ({
    items: state.items.entries,
    selectionDetails: state.items.selectionState
});
const mapDispatchToProps = (dispatch) => ({
    getSelectionState: (getFunction) => {
        dispatch(actions_1.getSelectionState(getFunction));
    },
    fetchUserData: (url, start) => {
        dispatch(actions_1.fetchUserData(url, start));
    }
});
class GridComponent extends React.Component {
    constructor() {
        super();
        this._selection = new DetailsList_1.Selection({
            onSelectionChanged: () => this.props.getSelectionState(this._getSelectionDetails())
        });
    }
    render() {
        const { items, selectionDetails } = this.props;
        return (React.createElement("div", null,
            React.createElement(UserCommandBar_1.UserCommandBar, { text: selectionDetails }),
            React.createElement(ContentList_1.default, { items: items, selectionDetails: selectionDetails, selection: this._selection })));
    }
    _getSelectionDetails() {
        let selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + this._selection.getSelection()[0].fname + ': ' + this._selection.getSelection()[0].username;
            default:
                return '' + selectionCount + ' items selected';
        }
    }
}
exports.ContentListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridComponent);
//# sourceMappingURL=ContentListContainer.js.map