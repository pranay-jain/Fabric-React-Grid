// This is a basic counter app which is not currently implemented in the main app.
import * as redux from "redux";
import { api } from '../api'
import { Store } from '../store';

type Q<T> = { request: T };
type S<T> = { response: T };
type E = { error: Error };

type QEmpty = Q<null>;
type QValue = Q<{ value: number }>;

export type CounterAction =
    { type: "INCREMENT_COUNTER", delta: number } |
    { type: "RESET_COUNTER" } |
    ({ type: "SAVE_COUNT_REQUEST" } & QValue) |
    ({ type: "SAVE_COUNT_SUCCESS" } & QValue & S<{}>) |
    ({ type: "SAVE_COUNT_ERROR" } & QValue & E) |
    ({ type: "LOAD_COUNT_REQUEST" } & QValue) |
    ({ type: "LOAD_COUNT_SUCCESS" } & QValue & S<{}>) |
    ({ type: "LOAD_COUNT_ERROR" } & QValue & E);

export const incrementCounter = (delta: number): CounterAction => (
    {
        type: "INCREMENT_COUNTER",
        delta,
    }
);

export const resetCounter = (): CounterAction => (
    {
        type: "RESET_COUNTER",
    }
);


export type ApiActionGroup<_Q, _S> = {
    request: (q?: _Q) => CounterAction & Q<_Q>
    success: (s: _S, q?: _Q) => CounterAction & Q<_Q> & S<_S>
    error: (e: Error, q?: _Q) => CounterAction & Q<_Q> & E
};

const _saveCount: ApiActionGroup<{ value: number }, {}> = {
    request: (request) =>
        ({ type: "SAVE_COUNT_REQUEST", request }),
    success: (response, request) =>
        ({ type: "SAVE_COUNT_SUCCESS", request, response }),
    error: (error, request) =>
        ({ type: "SAVE_COUNT_ERROR", request, error }),
};

const _loadCount: ApiActionGroup<null, { value: number }> = {
    request: (request) =>
        ({ type: "LOAD_COUNT_REQUEST", request: null }),
    success: (response, request) =>
        ({ type: "LOAD_COUNT_SUCCESS", request: null, response }),
    error: (error, request) =>
        ({ type: "LOAD_COUNT_ERROR", request: null, error }),
};

type apiFunc<Q, S> = (q: Q) => Promise<S>

function apiActionGroupFactory<Q, S>(x: ApiActionGroup<Q, S>, go: apiFunc<Q, S>) {
    return (request: Q) => (dispatch: redux.Dispatch<Store.All>) => {
        dispatch(x.request(request))
        go(request)
            .then((response: any) => dispatch(x.success(response, request)))
            .catch((e: Error) => dispatch(x.error(e, request)))
    }
}

export const saveCount = apiActionGroupFactory(_saveCount, api.save)
export const loadCount = () => apiActionGroupFactory(_loadCount, api.load)(null)