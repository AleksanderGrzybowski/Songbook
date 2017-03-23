import React from 'react';

const Lyrics = ({isPresent, title, text}) => (
    isPresent ? (
        <div>
            <h1 className="text-center">
                {title}
            </h1>

            <p>{text}</p>
        </div>
    ) : (
        <div/>
    )
);

export default Lyrics;
