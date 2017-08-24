import * as redux from "redux";
import { Store } from '../store';

export type PanelAction =
    { type: "TOGGLE_PANEL_OPEN" } |
    { type: "TOGGLE_PANEL_CLOSE" } |
    { type: "TOGGLE_PANEL_ADD_USER" } |
    { type: "TOGGLE_PANEL_EDIT_USER" };

export const openPanel = (): PanelAction => {
    return { type: "TOGGLE_PANEL_OPEN" }
}

export const closePanel = (): PanelAction => {
    return { type: "TOGGLE_PANEL_CLOSE" }
}

export const addUser = (): PanelAction => {
    return { type: "TOGGLE_PANEL_ADD_USER" }
}