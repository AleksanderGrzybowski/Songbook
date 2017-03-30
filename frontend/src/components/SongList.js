import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { translate } from 'react-i18next';

const SongList = ({songs, selectedSongId, onSongClick, t}) => {
    if (songs.length === 0) {
        return <h3 className="text-center">{t('noResults')}</h3>
    }

    const items = songs.map(song => (
        <a
            key={song.id}
            style={{cursor: 'pointer'}}
            className={'list-group-item ' + (selectedSongId === song.id ? 'active' : '')}
            onClick={() => onSongClick(song.id)}
        >
            {song.title}
        </a>
    ));

    return <ListGroup style={{height: '80vh', overflowY: 'auto'}}>{items}</ListGroup>;
};

export default translate()(SongList);
