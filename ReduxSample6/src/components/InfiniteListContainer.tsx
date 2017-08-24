import * as React from 'react';
import * as Redux from 'redux';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { addEntry, getSelectionState, fetchUserData, getUsers  } from '../actions';
import { connect } from 'react-redux';

import { Store } from '../store';

interface OwnProps {
    items: any[],
    columns:any,
    layoutMode: any,
    selection: any,
    selectionPreservedOnEmptyClick: any
};
interface ConnectedState {};

interface ConnectedDispatch {
    fetchUserData: (url: string, start: number) => void
};

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    items: state.items.entries,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    fetchUserData: (url: string, start: number) => {
        dispatch(getUsers(url, start, 5))
    }
});

class InfDetailsList extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    private canScroll: boolean;
    private url = 'http://services.odata.org/V4/(S(h1k5tq3hg52no4vzqsxggpsl))/TripPinServiceRW/People?';

    constructor() {
        super();

        this.resumeScrolls = this.resumeScrolls.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);

        this.resumeScrolls();
    }

    componentWillMount() {
        this.props.fetchUserData(this.url, 0);
    }

    componentDidMount() {
        this.resumeScrolls();
        var container: any = this.refs.container;
        container.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        var container: any = this.refs.container;
        container.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler() {
        if (!this.canScroll) return;

        if (this.isMoreInfoNeeded()) {
            console.log("here");
            this.canScroll = false;
            this.props.fetchUserData(this.url, 5);
        }
    }

    isMoreInfoNeeded() {
        var container: any = this.refs.container;
        var result: boolean = (container.scrollTop >= (container.scrollHeight - 2 * container.clientHeight));

        console.log(
            'isMoreInfoNeeded',
            result,
            container.scrollTop,
            container.scrollHeight,
            container.clientHeight
        );

        return result;
    }

    private resumeScrolls(): any {
        this.canScroll = true;
    }

    render() {
        const { columns, items, layoutMode, selection, selectionPreservedOnEmptyClick } = this.props;
        return (
            <div ref="container" style={{ maxHeight: "400px", overflow: 'auto' }}>
                <DetailsList columns={columns} items={items} setKey='set' layoutMode={layoutMode} selection={selection} selectionPreservedOnEmptyClick={selectionPreservedOnEmptyClick} onRowDidMount={this.resumeScrolls} />
            </div>
        );
    }
}

export const InfiniteListContainer: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(InfDetailsList);