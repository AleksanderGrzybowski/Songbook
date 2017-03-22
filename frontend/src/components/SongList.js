import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

const SongList = ({songs, fetchAndDisplaySongWithLyrics}) => {
    if (songs.length === 0) {
        return <h3 className="text-center">No results...</h3>
    }

    const items = songs.map(song => (
        <a
            key={song.id}
            style={{cursor: 'pointer'}}
            className="list-group-item"
            onClick={() => fetchAndDisplaySongWithLyrics(song.id)}
        >
            {song.title}
        </a>
    ));

    return (
        <ListGroup>
            {items}
        </ListGroup>
    )
};

export default SongList;
