import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface propTypes {
    onChange: (text: string, field: string) => any
}

const SidePanelForm = ({ onChange }: propTypes) => (
    <form>
        <TextField label='Enter First Name' onChanged={(text) => { onChange(text, 'fname'); }} underlined />
        <TextField label='Enter Last Name' onChanged={(text) => { onChange(text, 'lname'); }} underlined />
        <TextField label='Enter E-mail Address' onChanged={(text) => { onChange(text, 'email'); }} underlined />
    </form>
);

export default SidePanelForm;
