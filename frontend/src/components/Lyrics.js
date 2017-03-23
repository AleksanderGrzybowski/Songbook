import React from 'react';

const textStyle = {
    fontFamily: 'inherit',
    fontSize: '14px'
};

const Lyrics = ({isPresent, title, text}) => (
    isPresent ? (
        <div>
            <h1 className="text-center">
                {title}
            </h1>

            <pre style={textStyle}>{text}</pre>
        </div>
    ) : (
        <div/>
    )
);

export default Lyrics;
