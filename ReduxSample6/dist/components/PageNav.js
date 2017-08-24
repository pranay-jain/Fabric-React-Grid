"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Nav_1 = require("office-ui-fabric-react/lib/Nav");
const react_router_redux_1 = require("react-router-redux");
const react_redux_1 = require("react-redux");
;
;
;
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    newPage: () => {
        dispatch(react_router_redux_1.push('/newpage'));
    },
    homePage: () => {
        dispatch(react_router_redux_1.push('/'));
    }
});
class NavPaneComponent extends React.Component {
    render() {
        const styles = {
            width: '208px',
            height: '500px',
            boxSizing: 'border-box',
            border: '1px solid #EEE'
        };
        return (React.createElement("div", { className: 'ms-NavExample-LeftPane', style: styles },
            React.createElement(Nav_1.Nav, { groups: [
                    {
                        links: [
                            {
                                name: 'Guide',
                                url: '',
                                links: [{
                                        name: 'Home Page',
                                        url: '',
                                        onClick: () => this.props.homePage(),
                                        key: 'key1'
                                    },
                                    {
                                        name: 'New Page',
                                        url: '',
                                        onClick: () => this.props.newPage(),
                                        key: 'key2'
                                    }],
                                isExpanded: true
                            },
                            {
                                name: 'Edit',
                                url: '',
                                onClick: () => this.props.newPage(),
                                icon: 'Edit',
                                key: 'key8'
                            }
                        ]
                    }
                ], expandedStateText: 'expanded', collapsedStateText: 'collapsed', selectedKey: 'key3' })));
    }
}
exports.PageNav = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NavPaneComponent);
//# sourceMappingURL=PageNav.js.map