import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const textStyle = {
    fontFamily: 'inherit',
    fontSize: '14px'
};

const Lyrics = ({isPresent, title, text}) => {

    const menuIcon = <span className="glyphicon glyphicon-option-vertical"/>;
    const menu = (
        <DropdownButton title={menuIcon} id="lyrics-menu">
            <MenuItem>
                <span className="glyphicon glyphicon-edit"/> Edit...
            </MenuItem>
            <MenuItem>
                <span className="glyphicon glyphicon-trash"/> Delete...
            </MenuItem>
        </DropdownButton>
    );

    const main = (
        <div>
            <h1 className="text-center">
                {title}
                <div className="pull-right">

                    {menu}
                </div>
            </h1>

            <pre style={textStyle}>{text}</pre>
        </div>
    );

    return isPresent ? main : <div/>;
};

export default Lyrics;
