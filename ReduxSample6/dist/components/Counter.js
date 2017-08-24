"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const CounterPres = ({ label, counter, clickHandler }) => (React.createElement("div", null,
    React.createElement("label", null, "Title Text"),
    React.createElement("pre", null,
        "counter = ",
        counter.value),
    React.createElement(Button_1.PrimaryButton, { onClick: () => clickHandler() }, "click me!")));
exports.default = CounterPres;
//# sourceMappingURL=Counter.js.map