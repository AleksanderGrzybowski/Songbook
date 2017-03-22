import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from 'react-spinkit';

export default class SongList extends Component {
    render() {
        if (this.props.requestInProgress) {
            return <Spinner className="text-center" spinnerName='three-bounce'/>
        }

        const items = this.props.songs.map(song => (
            <ListGroupItem key={song.id}>
                <span>{song.title}</span>
            </ListGroupItem>
        ));

        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}
