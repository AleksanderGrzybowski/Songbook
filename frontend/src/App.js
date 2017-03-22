import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';
import { Row, Col, Grid } from 'react-bootstrap';
import SongList from './components/SongList';
import SearchInput from './components/SearchInput';
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
                        />
                    </Col>
                </Row>
            </div>
        );

        let component;

        if (!this.props.health.healthy) {
            component = <ErrorPage/>;
        } else if (this.props.view.currentView === 'search') {
            component = searchView;
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
