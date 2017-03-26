import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const SearchInput = ({text, inputChanged}) => (
    <h1 className="text-center">
        <FormGroup bsSize="large">
            <FormControl
                type="text"
                placeholder="Search..."
                value={text}
                onChange={e => inputChanged(e.target.value)}
            />
        </FormGroup>
    </h1>
);

export default SearchInput;
