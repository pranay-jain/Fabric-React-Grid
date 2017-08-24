"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const UserCommandBar_1 = require("./UserCommandBar");
;
;
;
;
const mapStateToProps = (state, ownProps) => ({
    selectionDetails: state.items.selectionState
});
const mapDispatchToProps = (dispatch) => ({});
class AppComponent extends React.Component {
    render() {
        const { selectionDetails } = this.props;
        return (React.createElement("div", null,
            React.createElement(UserCommandBar_1.UserCommandBar, { text: selectionDetails }),
            React.createElement("h2", null, "This is a new page. ")));
    }
}
exports.NewPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppComponent);
//# sourceMappingURL=NewPage.js.map