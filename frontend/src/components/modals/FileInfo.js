import React from 'react';

import { translate } from 'react-i18next';

const FileInfo = ({data, t}) => {

    let infoText = '';
    if (data.length !== 0) {
        try {
            const json = JSON.parse(data);
            infoText = t('importFileSummary', {size: data.length, count: json.length});
        } catch (e) {
            infoText = t('fileNotRecognized');
        }
    }

    return <p>{infoText}</p>
};

export default translate()(FileInfo);
