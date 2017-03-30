import React from 'react';
import { DropdownButton, Glyphicon, MenuItem } from 'react-bootstrap';
import { translate } from 'react-i18next';

const LyricsControls = ({onEdit, onDelete, t}) => (
    <DropdownButton title={<Glyphicon glyph="option-vertical"/>} id="lyrics-menu">
        <MenuItem onClick={onEdit}>
            <Glyphicon glyph="edit"/> {t('edit') + '...'}
        </MenuItem>

        <MenuItem onClick={onDelete}>
            <Glyphicon glyph="trash"/> {t('delete') + '...'}
        </MenuItem>
    </DropdownButton>
);

export default translate()(LyricsControls);
