import React from 'react';
import { translate } from 'react-i18next';

const Lyrics = ({controls, isPresent, title, text, t}) => isPresent ? (
    <div>
        <h1 className="text-center">
            {title}
            <div className="pull-right">
                {controls}
            </div>
        </h1>

        <p style={{fontFamily: 'inherit', fontSize: '16px', whiteSpace: 'pre'}}>
            {text}
        </p>
    </div>
) : (
    <div>
        <h3 className="text-center">{t('pickSongOrSearch')}</h3>
    </div>
);

export default translate()(Lyrics);
