"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var data_nonFocusable_1 = require("./data-nonFocusable");
var CommandBarNonFocusableItemsExample = (function (_super) {
    __extends(CommandBarNonFocusableItemsExample, _super);
    function CommandBarNonFocusableItemsExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandBarNonFocusableItemsExample.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: true, items: data_nonFocusable_1.itemsNonFocusable, farItems: data_nonFocusable_1.farItemsNonFocusable })));
    };
    return CommandBarNonFocusableItemsExample;
}(React.Component));
exports.CommandBarNonFocusableItemsExample = CommandBarNonFocusableItemsExample;
//# sourceMappingURL=CommandBar.js.map