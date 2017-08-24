"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const Counter_1 = require("./Counter");
;
;
;
const mapStateToProps = (state, ownProps) => ({
    counter: state.counter
});
const mapDispatchToProps = (dispatch) => ({
    increment: (n) => {
        dispatch(actions_1.incrementCounter(n));
    },
});
class CounterComponent extends React.Component {
    constructor() {
        super(...arguments);
        this._onClickIncrement = () => {
            this.props.increment(1);
        };
    }
    render() {
        const { counter, label } = this.props;
        return React.createElement(Counter_1.default, { label: label, counter: counter, clickHandler: this._onClickIncrement });
    }
}
;
exports.CounterContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
//# sourceMappingURL=CounterContainer.js.map