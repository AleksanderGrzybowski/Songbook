import React from 'react';

const textStyle = {
    fontFamily: 'inherit',
    fontSize: '16px',
    whiteSpace: 'pre'
};

const Lyrics = ({controls, isPresent, title, text}) => {
    const main = (
        <div>
            <h1 className="text-center">
                {title}
                <div className="pull-right">
                    {controls}
                </div>
            </h1>

            <p style={textStyle}>{text}</p>
        </div>
    );

    const empty = (
        <div>
            <h3 className="text-center">Pick a song from the left, or search...</h3>
        </div>
    );

    return isPresent ? main : empty;
};

export default Lyrics;
