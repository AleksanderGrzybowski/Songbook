import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid } from 'react-bootstrap';
import SongList from './components/SongList';
import SearchInput from './components/SearchInput';
import Lyrics from './components/Lyrics';

class App extends Component {
    render() {
        const mainView = (
            <div>
                <Row>
                    <Col md={6} mdPush={3}>
                        <SearchInput
                            text={this.props.searchInput}
                            inputChanged={this.props.searchInputChanged}
                            fetchSongsFiltered={this.props.fetchSongsFiltered}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SongList
                            songs={this.props.songList.songs}
                            requestInProgress={this.props.songList.requestInProgress}
                            onSongClick={this.props.onSongClick}
                            fetchAndDisplaySongWithLyrics={this.props.fetchAndDisplaySongWithLyrics}
                        />
                    </Col>
                    <Col md={9}>
                        <Lyrics
                            isPresent={this.props.songWithLyrics.isPresent}
                            title={this.props.songWithLyrics.title}
                            text={this.props.songWithLyrics.text}
                        />
                    </Col>
                </Row>
            </div>
        );

        let component;

        if (!this.props.health.healthy) {
            component = <ErrorPage/>;
        } else if (this.props.view.currentView === 'main') {
            component = mainView;
        } else {
            component = <div>Not yet implemented</div>
        }

        return (
            <Grid>
                {component}
            </Grid>
        )
    }
}

export default App;
