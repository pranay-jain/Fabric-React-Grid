import * as redux from "redux";
import { Store } from '../store';

import "promise/polyfill";
import "whatwg-fetch";

declare var fetch: any;

type GridEntry = {
    key: number,
    fname: string,
    lname: string,
    username: number,
    email: string
};

export type GridAction =
    { type: "SAVE_ENTRY", entry: GridEntry, selectedEntry: GridEntry } |
    { type: "GET_SELECTION_STATE", getSelectionDetails: string } |
    { type: "FETCH_USER_DATA", url: string } |
    { type: "USERS_FETCH", url: string } |
    { type: 'USERS_FETCH_SUCCEEDED', users: any } |
    { type: 'USERS_FETCH_DATA_PENDING', payload: any } |
    { type: 'USERS_FETCH_DATA_FULFILLED', payload: any };

export const addEntry = (item: GridEntry, selectedEntry: GridEntry): GridAction => {
    return { type: "SAVE_ENTRY", entry: item, selectedEntry: selectedEntry }
}

export const getSelectionState = (getSelectionDetails: string): GridAction => {
    return { type: "GET_SELECTION_STATE", getSelectionDetails: getSelectionDetails }
}

export const getUsers = (url: string, start: number, numberOfElements: number): GridAction => {
    let queryUrl = url + '$top=' + numberOfElements + (start ? ('&$skip=' + start) : '');
    return {
        type: "USERS_FETCH",
        url: queryUrl
    }
}

export function fetchUserData(url: string, start: number) {
    let queryUrl = url + '$top=' + 5 + (start ? ('&$skip=' + start) : '');
    return (dispatch: any) => {
        dispatch(getDispatchObject(queryUrl));
    }
}

const getDispatchObject = (url: string) => ({
    type: "USERS_FETCH_DATA",
    payload: new Promise((resolve, reject) => {
        fetch(url)
            .then((response: any) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response: any) => response.json())
            .then((items: any) => {
                let users: GridEntry[] = [];
                let index: number = 0;
                for (var item of items.value) {
                    let user: GridEntry = {
                        key: index,
                        fname: item["FirstName"],
                        lname: item["LastName"],
                        username: item["UserName"],
                        email: item["Emails"][0]
                    }
                    index++;
                    users.push(user);
                }
                console.log(users);
                resolve(users);
            })
    })
});