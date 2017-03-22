import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class SongList extends Component {
    render() {
        const items = this.props.songs.map(song => (
            <ListGroupItem key={song.id}>
                <span onClick={this.props.fetchAndDisplaySongWithLyrics.bind(this, song.id)}>{song.title}</span>
            </ListGroupItem>
        ));

        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}
