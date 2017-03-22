import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid } from 'react-bootstrap';
import SongList from './components/SongList';
import SearchInput from './components/SearchInput';
import Lyrics from './components/Lyrics';
class App extends Component {
    render() {
        const searchView = (
            <div>
                <Row>
                    <Col md={12}>
                        <SearchInput fetchSongsFiltered={this.props.fetchSongsFiltered}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} mdPush={3}>
                        <SongList
                            songs={this.props.songList.songs}
                            requestInProgress={this.props.songList.requestInProgress}
                            onSongClick={this.props.onSongClick}
                            fetchAndDisplaySongWithLyrics={this.props.fetchAndDisplaySongWithLyrics}
                        />
                    </Col>
                </Row>
            </div>
        );

        const lyricsView = (
            <Lyrics
                title={this.props.songWithLyrics.title}
                text={this.props.songWithLyrics.text}
                goBack={() => this.props.changeView('search')}
            />
        );

        let component;

        if (!this.props.health.healthy) {
            component = <ErrorPage/>;
        } else if (this.props.view.currentView === 'search') {
            component = searchView;
        } else if (this.props.view.currentView === 'lyrics') {
            component = lyricsView;
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
