import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
    health,
    view,
    searchInput,
    songList,
    songWithLyrics,
    newSongModal,
    deleteSongModal
} from './reducers';
import {
    healthCheck,
    changeView,
    fetchAllSongs,
    fetchSongsFiltered,
    setSelectedSong,
    fetchAndDisplaySongWithLyrics,
    searchInputChanged,
    newSongModalOpen,
    newSongModalClose,
    newSongTextChanged,
    newSongTitleChanged,
    newSongSave,
    deleteSongModalOpen,
    deleteSong, deleteSongModalClose,

} from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    combineReducers({health, view, searchInput, songList, songWithLyrics, newSongModal, deleteSongModal}),
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
    },
    newSongSave: (title, text) => dispatch(newSongSave(title, text)),
    newSongModalOpen: () => dispatch(newSongModalOpen()),
    newSongModalClose: () => dispatch(newSongModalClose()),
    newSongTitleChanged: (title) => dispatch(newSongTitleChanged(title)),
    newSongTextChanged: (text) => dispatch(newSongTextChanged(text)),
    deleteSong: () => dispatch(deleteSong()),
    deleteSongModalOpen: () => dispatch(deleteSongModalOpen()),
    deleteSongModalClose: () => dispatch(deleteSongModalClose())
});

const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

const loadingSpinner = document.getElementsByClassName('loading')[0];
loadingSpinner.remove();

store.dispatch(healthCheck());
store.dispatch(fetchAllSongs());
