import { Store } from '../store';
import { GridAction } from "../actions/UserGridActions";
import typeToReducer from 'type-to-reducer';

type GridEntry = {
    key: number,
    fname: string,
    lname: string,
    username: number,
    email: string
};

const initialGrid: Store.Items = { entries: [], selectionState: '', isLoading: false };

 export const gridSetup = (state: Store.Items = initialGrid, action: GridAction): Store.Items => {
    const { entries, selectionState, isLoading } = state;

    switch (action.type) {
        case "SAVE_ENTRY":
            const newEntry = action.entry;
            const selectedEntry = action.selectedEntry;
            let newElement: GridEntry;
            // REVIEW how to implement the user search better
            for (let entry of entries) {
                if (entry.key === selectedEntry.key) {
                    newElement = {
                        key: entry.key,
                        fname: newEntry.fname === '' ? entry.fname : newEntry.fname,
                        lname: newEntry.lname === '' ? entry.lname : newEntry.lname,
                        username: entry.username,
                        email: newEntry.email === '' ? entry.email : newEntry.email
                    }
                    return { entries: [...entries.slice(0, entry.key), newElement, ...entries.slice(entry.key + 1)], selectionState, isLoading }
                }
            }

            return { entries: [...entries, action.entry], selectionState, isLoading }
        case "GET_SELECTION_STATE":
            return { entries, selectionState: action.getSelectionDetails, isLoading }
        case "USERS_FETCH_SUCCEEDED":
            return { entries: action.users, selectionState, isLoading }
        default: return {
            entries,
            selectionState,
            isLoading
        };
    }
}