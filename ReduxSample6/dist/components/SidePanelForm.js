"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const SidePanelForm = ({ onChange }) => (React.createElement("form", null,
    React.createElement(TextField_1.TextField, { label: 'Enter First Name', onChanged: (text) => { onChange(text, 'fname'); }, underlined: true }),
    React.createElement(TextField_1.TextField, { label: 'Enter Last Name', onChanged: (text) => { onChange(text, 'lname'); }, underlined: true }),
    React.createElement(TextField_1.TextField, { label: 'Enter E-mail Address', onChanged: (text) => { onChange(text, 'email'); }, underlined: true })));
exports.default = SidePanelForm;
//# sourceMappingURL=SidePanelForm.js.map