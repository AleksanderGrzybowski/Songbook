import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid } from 'react-bootstrap';
import SongList from './components/SongList';

class App extends Component {
    render() {
        if (!this.props.health.healthy) {
            return <ErrorPage/>
        }

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1 className="text-center">Search: </h1>
                    </Col>
                </Row>
                    <Col md={6} mdPush={3}>
                        <SongList songs={this.props.songList.songs}/>
                    </Col>
            </Grid>
        )
    }
}

export default App;
