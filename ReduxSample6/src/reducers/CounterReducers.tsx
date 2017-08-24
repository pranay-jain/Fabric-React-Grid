import { Store } from '../store';
import { CounterAction } from "../actions/CounterActions";

const initialState: Store.Counter = {
    value: 0,
};

export const counter = (state: Store.Counter = initialState, action: CounterAction): Store.Counter => {
    const { value } = state;
    switch (action.type) {
        case "INCREMENT_COUNTER":
            const newValue = value + action.delta;
            return { value: newValue };
        case "RESET_COUNTER":
            return { value: 0 };
        default:
            return state;
    }
};
