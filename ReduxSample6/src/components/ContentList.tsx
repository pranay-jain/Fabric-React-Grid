import * as React from "react";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

import { SidePanelContainer } from './SidePanelContainer';
import { InfiniteListContainer } from './InfiniteListContainer';

interface propTypes {
    items: any[],
    selectionDetails: string,
    selection: any
}

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

const ContentList = ({ items, selectionDetails, selection }: propTypes) => (
    <div>
         <TextField
            label='Filter by name:'
            onChanged={text => this.setState({ items: text ? items.filter((i: any) => i.fname.toLowerCase().indexOf(text) > -1) : items })}
        />
        <MarqueeSelection selection={this._selection}>
            <InfiniteListContainer
                items={items}
                columns={_columns}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selection={selection}
                selectionPreservedOnEmptyClick={true}
            />
        </MarqueeSelection>

        <SidePanelContainer text={selectionDetails} selectedEntry={selection} />
    </div>
);

export default ContentList;