import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const LyricsControls = ({onEdit, onDelete}) => {
    const menuIcon = <span className="glyphicon glyphicon-option-vertical"/>;
    return (
        <DropdownButton title={menuIcon} id="lyrics-menu">
            <MenuItem onClick={onEdit}>
                <span className="glyphicon glyphicon-edit"/> Edit...
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <span className="glyphicon glyphicon-trash"/> Delete...
            </MenuItem>
        </DropdownButton>
    );
};

export default LyricsControls;
