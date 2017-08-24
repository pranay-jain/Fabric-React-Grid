import { Store } from '../store';
import { PanelAction } from "../actions/SidePanelActions";

const initialPanel: Store.PanelContent = { showPanel: false, content: '' };

export const togglePanel = (state: Store.PanelContent = initialPanel, action: PanelAction): Store.PanelContent => {
    switch (action.type) {
        case "TOGGLE_PANEL_OPEN":
            return { showPanel: true, content: '' };
        case "TOGGLE_PANEL_CLOSE":
            return { showPanel: false, content: '' };
        case "TOGGLE_PANEL_ADD_USER":
            return { showPanel: true, content: "ADD_USER" }
        default: return state;
    }
}