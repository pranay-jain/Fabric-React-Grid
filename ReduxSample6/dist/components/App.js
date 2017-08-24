"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PageNav_1 = require("./PageNav");
const react_router_dom_1 = require("react-router-dom");
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
        return (React.createElement("div", { className: "ms-Grid" },
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2" },
                    React.createElement(PageNav_1.PageNav, null)),
                React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg10" }, this.props.children))));
    }
}
const AppTemp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppComponent);
exports.App = react_router_dom_1.withRouter(AppTemp);
//# sourceMappingURL=App.js.map