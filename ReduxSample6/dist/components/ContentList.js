"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const MarqueeSelection_1 = require("office-ui-fabric-react/lib/MarqueeSelection");
const SidePanelContainer_1 = require("./SidePanelContainer");
const InfiniteListContainer_1 = require("./InfiniteListContainer");
let _columns = [
    {
        key: 'column1',
        name: 'First Name',
        fieldName: 'fname',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column2',
        name: 'Last Name',
        fieldName: 'lname',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column3',
        name: 'User Name',
        fieldName: 'username',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column4',
        name: 'E-mail Address',
        fieldName: 'email',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
];
const ContentList = ({ items, selectionDetails, selection }) => (React.createElement("div", null,
    React.createElement(TextField_1.TextField, { label: 'Filter by name:', onChanged: text => this.setState({ items: text ? items.filter((i) => i.fname.toLowerCase().indexOf(text) > -1) : items }) }),
    React.createElement(MarqueeSelection_1.MarqueeSelection, { selection: this._selection },
        React.createElement(InfiniteListContainer_1.InfiniteListContainer, { items: items, columns: _columns, layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns, selection: selection, selectionPreservedOnEmptyClick: true })),
    React.createElement(SidePanelContainer_1.SidePanelContainer, { text: selectionDetails, selectedEntry: selection })));
exports.default = ContentList;
//# sourceMappingURL=ContentList.js.map