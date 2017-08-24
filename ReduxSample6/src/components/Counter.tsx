import * as React from "react";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { incrementCounter } from "../actions";

interface CounterProps {
    label: string,
    counter: { value: number },
    clickHandler: Function
}

const CounterPres = ({ label, counter, clickHandler }: CounterProps) => (
    <div>
        <label>Title Text</label>
        <pre>counter = {counter.value}</pre>
        <PrimaryButton onClick={() => clickHandler()}>click me!</PrimaryButton>
    </div>
);

export default CounterPres;