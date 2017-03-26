import React from 'react';

const textStyle = {
    fontFamily: 'inherit',
    fontSize: '14px'
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

            <pre style={textStyle}>{text}</pre>
        </div>
    );

    return isPresent ? main : <div/>;
};

export default Lyrics;
