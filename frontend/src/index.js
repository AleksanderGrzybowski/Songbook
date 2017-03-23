import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { health, view, searchInput, songList, songWithLyrics } from './reducers';
import {
    healthCheck,
    changeView,
    fetchAllSongs,
    fetchSongsFiltered,
    setSelectedSong,
    fetchAndDisplaySongWithLyrics,
    searchInputChanged
} from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    combineReducers({health, view, searchInput, songList, songWithLyrics}),
    applyMiddleware(thunk, createLogger({collapsed: true}))
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    changeView: (viewName) => dispatch(changeView(viewName)),
    searchInputChanged: (text) => dispatch(searchInputChanged(text)),
    fetchSongsFiltered: (query) => dispatch(fetchSongsFiltered(query)),
    onSongClick: (id) => {
        dispatch(setSelectedSong(id));
        dispatch(fetchAndDisplaySongWithLyrics(id));
    }
});

const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

store.dispatch(healthCheck());
store.dispatch(fetchAllSongs());
