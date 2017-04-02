import React from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { translate } from 'react-i18next';

const SearchInput = ({text, inputChanged, t}) => (
    <h1 className="text-center">
        <FormGroup bsSize="large">
            <InputGroup bsSize="large">
                <FormControl
                    type="text"
                    placeholder={t('search') + '...'}
                    value={text}
                    onChange={e => inputChanged(e.target.value)}
                />
                <InputGroup.Addon
                    style={{cursor: 'pointer'}}
                    onClick={e => inputChanged('')}
                >
                    <span>&times;</span>
                </InputGroup.Addon>
            </InputGroup>
        </FormGroup>

    </h1>
);

export default translate()(SearchInput);
