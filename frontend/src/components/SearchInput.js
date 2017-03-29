import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { translate } from 'react-i18next';

const SearchInput = ({text, inputChanged, t}) => (
    <h1 className="text-center">
        <FormGroup bsSize="large">
            <FormControl
                type="text"
                placeholder={t('search') + '...'}
                value={text}
                onChange={e => inputChanged(e.target.value)}
            />
        </FormGroup>
    </h1>
);

export default translate()(SearchInput);
