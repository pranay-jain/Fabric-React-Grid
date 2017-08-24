"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialPanel = { showPanel: false, content: '' };
exports.togglePanel = (state = initialPanel, action) => {
    switch (action.type) {
        case "TOGGLE_PANEL_OPEN":
            return { showPanel: true, content: '' };
        case "TOGGLE_PANEL_CLOSE":
            return { showPanel: false, content: '' };
        case "TOGGLE_PANEL_ADD_USER":
            return { showPanel: true, content: "ADD_USER" };
        default: return state;
    }
};
//# sourceMappingURL=SidePanelReducers.js.map