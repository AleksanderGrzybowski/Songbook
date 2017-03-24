import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid, Modal, Button, ButtonToolbar } from 'react-bootstrap';
import SongList from './components/SongList';
import SearchInput from './components/SearchInput';
import Lyrics from './components/Lyrics';
import NewSongModal from './components/NewSongModal';
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
                        <Button style={{marginBottom: '5px'}} bsStyle="primary"
                                onClick={this.props.newSongModalOpen}>
                            <span className="glyphicon glyphicon-plus"/> New song
                        </Button>
                        <SongList
                            songs={this.props.songList.songs}
                            selectedSongId={this.props.songList.selectedSongId}
                            requestInProgress={this.props.songList.requestInProgress}
                            onSongClick={this.props.onSongClick}
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

        const modal = this.props.newSongModal.visible ? (
            <NewSongModal
                title={this.props.newSongModal.title}
                text={this.props.newSongModal.text}
                onTextChange={this.props.newSongTextChanged}
                onTitleChange={this.props.newSongTitleChanged}
                onSave={this.props.newSongSave}
                onClose={this.props.newSongModalClose}
            />
        ) : null;

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
                {modal}
            </Grid>
        )
    }
}

export default App;
