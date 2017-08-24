export namespace Store {
    export type Counter = { value: number };
    export type Items = {
        entries: any[],
        selectionState: string,
        isLoading: boolean
    };
    export type PanelContent = {
        showPanel: boolean,
        content: string
    };

    export type All = {
        counter: Counter,
        items: Items,
        panelContent: PanelContent
    };
}