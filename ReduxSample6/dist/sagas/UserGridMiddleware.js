"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
// Our worker Saga: will perform the async increment task
function* fetchData(action) {
    try {
        const users = yield effects_1.call(exports.fetchUsers, action.url);
        yield effects_1.put({ type: 'USERS_FETCH_SUCCEEDED', users });
    }
    catch (error) {
        yield effects_1.put({ type: 'USERS_FETCH_FAILED', error });
    }
}
exports.fetchData = fetchData;
exports.fetchUsers = (url) => {
    return fetch(url)
        .then((response) => {
        if (response.status !== 200) {
            // Throws to the catch below with the error code.
            throw (response.status);
        }
        return response.json();
    })
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
        return users;
    })
        .catch((err) => {
        console.error('Error fetching users: ', err);
        throw (err);
    });
};
//# sourceMappingURL=UserGridMiddleware.js.map