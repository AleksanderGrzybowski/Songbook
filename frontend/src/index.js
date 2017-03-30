import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import {
    healthCheck,
    changeView,
    fetchAllSongs,
    fetchSongsFiltered,
    setSelectedSong,
    fetchAndDisplaySongWithLyrics,
    searchInputChanged,
    songModalOpen,
    songModalClose,
    songModalTextChanged,
    songModalTitleChanged,
    songSave,
    deleteSongModalOpen,
    deleteSong,
    deleteSongModalClose,

    importSongs,
    importModalDataChanged,
    importModalOpen,
    importModalClose
} from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const store = createStore(
    combineReducers({...reducers}),
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
    songSave: (title, text) => dispatch(songSave(title, text)),
    songModalOpen: (mode, id, title, text) => dispatch(songModalOpen(mode, id, title, text)),
    songModalClose: () => dispatch(songModalClose()),
    songModalTitleChanged: (title) => dispatch(songModalTitleChanged(title)),
    songModalTextChanged: (text) => dispatch(songModalTextChanged(text)),
    deleteSong: (id) => dispatch(deleteSong(id)),
    deleteSongModalOpen: () => dispatch(deleteSongModalOpen()),
    deleteSongModalClose: () => dispatch(deleteSongModalClose()),
   
    importSongs: () => dispatch(importSongs()),
    importModalDataChanged: (data) => dispatch(importModalDataChanged(data)),
    importModalOpen: () => dispatch(importModalOpen()),
    importModalClose: () => dispatch(importModalClose())
});

const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <LiveApp/>
        </Provider>
    </I18nextProvider>,
    document.getElementById('root')
);

const loadingSpinner = document.getElementsByClassName('loading')[0];
loadingSpinner.remove();

store.dispatch(healthCheck());
store.dispatch(fetchAllSongs());
