"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const actions_1 = require("../actions");
const react_redux_1 = require("react-redux");
;
;
;
const mapStateToProps = (state, ownProps) => ({
    items: state.items.entries,
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserData: (url, start) => {
        dispatch(actions_1.getUsers(url, start, 5));
    }
});
class InfDetailsList extends React.Component {
    constructor() {
        super();
        this.url = 'http://services.odata.org/V4/(S(h1k5tq3hg52no4vzqsxggpsl))/TripPinServiceRW/People?';
        this.resumeScrolls = this.resumeScrolls.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.resumeScrolls();
    }
    componentWillMount() {
        this.props.fetchUserData(this.url, 0);
    }
    componentDidMount() {
        this.resumeScrolls();
        var container = this.refs.container;
        container.addEventListener('scroll', this.scrollHandler);
    }
    componentWillUnmount() {
        var container = this.refs.container;
        container.removeEventListener('scroll', this.scrollHandler);
    }
    scrollHandler() {
        if (!this.canScroll)
            return;
        if (this.isMoreInfoNeeded()) {
            console.log("here");
            this.canScroll = false;
            this.props.fetchUserData(this.url, 5);
        }
    }
    isMoreInfoNeeded() {
        var container = this.refs.container;
        var result = (container.scrollTop >= (container.scrollHeight - 2 * container.clientHeight));
        console.log('isMoreInfoNeeded', result, container.scrollTop, container.scrollHeight, container.clientHeight);
        return result;
    }
    resumeScrolls() {
        this.canScroll = true;
    }
    render() {
        const { columns, items, layoutMode, selection, selectionPreservedOnEmptyClick } = this.props;
        return (React.createElement("div", { ref: "container", style: { maxHeight: "400px", overflow: 'auto' } },
            React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, setKey: 'set', layoutMode: layoutMode, selection: selection, selectionPreservedOnEmptyClick: true, onRowDidMount: this.resumeScrolls })));
    }
}
exports.InfiniteListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InfDetailsList);
//# sourceMappingURL=InfiniteListContainer.js.map