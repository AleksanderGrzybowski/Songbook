import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid } from 'react-bootstrap';
import SongList from './components/SongList';
import SearchInput from './components/SearchInput';
class App extends Component {
    render() {
        if (!this.props.health.healthy) {
            return <ErrorPage/>
        }

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <SearchInput fetchSongsFiltered={this.props.fetchSongsFiltered}/>
                    </Col>
                </Row>
                <Col md={6} mdPush={3}>
                    <SongList
                        songs={this.props.songList.songs}
                        requestInProgress={this.props.songList.requestInProgress}
                    />
                </Col>
            </Grid>
        )
    }
}

export default App;
