import { call, put } from 'redux-saga/effects';
//import { fetchUsers } from '../api/api';

type GridEntry = {
    key: number,
    fname: string,
    lname: string,
    username: number,
    email: string
};

// Our worker Saga: will perform the async increment task
export function* fetchData(action: any): any {
    try {
        const users = yield call(fetchUsers, action.url);
        yield put({ type: 'USERS_FETCH_SUCCEEDED', users })
    }
    catch (error) {
        yield put({ type: 'USERS_FETCH_FAILED', error })
    }
}

export const fetchUsers = (url: string): Promise<any> => {
    return fetch(url)
        .then((response: any) => {
            if (response.status !== 200) {
                // Throws to the catch below with the error code.
                throw (response.status);
            }
            
            return response.json();
        })
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
            return users;
        })
        .catch((err: any) => {
            console.error('Error fetching users: ', err);
            throw (err)
        })
}
