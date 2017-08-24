"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("promise/polyfill");
require("whatwg-fetch");
exports.addEntry = (item, selectedEntry) => {
    return { type: "SAVE_ENTRY", entry: item, selectedEntry: selectedEntry };
};
exports.getSelectionState = (getSelectionDetails) => {
    return { type: "GET_SELECTION_STATE", getSelectionDetails: getSelectionDetails };
};
exports.getUsers = (url, start, numberOfElements) => {
    let queryUrl = url + '$top=' + numberOfElements + (start ? ('&$skip=' + start) : '');
    return {
        type: "USERS_FETCH",
        url: queryUrl
    };
};
function fetchUserData(url, start) {
    let queryUrl = url + '$top=' + 5 + (start ? ('&$skip=' + start) : '');
    return (dispatch) => {
        dispatch(getDispatchObject(queryUrl));
    };
}
exports.fetchUserData = fetchUserData;
const getDispatchObject = (url) => ({
    type: "USERS_FETCH_DATA",
    payload: new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
            .then((response) => response.json())
            .then((items) => {
            let users = [];
            let index = 0;
            for (var item of items.value) {
                let user = {
                    key: index,
                    fname: item["FirstName"],
                    lname: item["LastName"],
                    username: item["UserName"],
                    email: item["Emails"][0]
                };
                index++;
                users.push(user);
            }
            console.log(users);
            resolve(users);
        });
    })
});
//# sourceMappingURL=UserGridActions.js.map