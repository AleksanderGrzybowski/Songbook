import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { translate } from 'react-i18next';

const LyricsControls = ({onEdit, onDelete, t}) => {
    const menuIcon = <span className="glyphicon glyphicon-option-vertical"/>;
    return (
        <DropdownButton title={menuIcon} id="lyrics-menu">
            <MenuItem onClick={onEdit}>
                <span className="glyphicon glyphicon-edit"/>{t('edit') + '...'}
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <span className="glyphicon glyphicon-trash"/>{t('delete') + '...'}
            </MenuItem>
        </DropdownButton>
    );
};

export default translate()(LyricsControls);
