"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Panel_1 = require("office-ui-fabric-react/lib/Panel");
const SidePanel = ({ showPanel, openPanel, closePanel, formMarkup, displayText, handleSave }) => (React.createElement("div", null,
    React.createElement(Button_1.DefaultButton, { description: 'Opens the Sample Panel', onClick: () => openPanel(), text: 'Open Panel' }),
    React.createElement(Panel_1.Panel, { isOpen: showPanel, type: Panel_1.PanelType.medium, isLightDismiss: true, onDismiss: () => closePanel(), headerText: displayText, onRenderFooterContent: () => {
            return (React.createElement("div", null,
                React.createElement(Button_1.PrimaryButton, { onClick: () => handleSave(), style: { 'marginRight': '8px' } }, "Save"),
                React.createElement(Button_1.DefaultButton, { onClick: () => closePanel() }, "Cancel")));
        } }, formMarkup)));
exports.default = SidePanel;
//# sourceMappingURL=SidePanel.js.map