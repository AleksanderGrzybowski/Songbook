import axios from 'axios';
import backendUrl from './backendUrl';


const backendNotHealthy = () => ({type: 'BACKEND_HEALTH_CHECK_FAIL'});
const backendHealthy = () => ({type: 'BACKEND_HEALTH_CHECK_SUCCESS'});
export const healthCheck = () => (dispatch) => {
    axios.get(`${backendUrl}/health`, {timeout: 10000})
        .then(() => dispatch(backendHealthy()))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const changeView = (view) => ({type: 'CHANGE_VIEW', view});

const loadSongs = (data) => ({type: 'LOAD_SONGS', songs: data});
export const loadSongsRequestStarted = () => ({type: 'LOAD_SONGS_REQUEST_STARTED'});
export const fetchAllSongs = () => (dispatch) => {
    dispatch(loadSongsRequestStarted());

    axios.get(`${backendUrl}/songs`)
        .then(({data}) => dispatch(loadSongs(data)))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const fetchSongsFiltered = (query) => (dispatch) => {
    dispatch(loadSongsRequestStarted());

    axios.get(`${backendUrl}/songs?query=${query}`)
        .then(({data}) => dispatch(loadSongs(data)))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const setSelectedSong = (id) => ({type: 'SET_SELECTED_SONG', id});

export const searchInputChanged = (text) => (dispatch) => {
    dispatch({type: 'SEARCH_INPUT_CHANGED', text});
    dispatch(fetchSongsFiltered(text));
};

const loadSongWithLyrics = (data) => ({type: 'LOAD_SONG_WITH_LYRICS', song: data});
export const fetchAndDisplaySongWithLyrics = (id) => (dispatch) => {
    axios.get(`${backendUrl}/songs/${id}`)
        .then(({data}) => dispatch(loadSongWithLyrics(data)))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const newSongModalOpen = () => ({type: 'NEW_SONG_MODAL_OPEN'});
export const newSongModalClose = () => ({type: 'NEW_SONG_MODAL_CLOSE'});
export const newSongTitleChanged = (title) => ({type: 'NEW_SONG_TITLE_CHANGED', title});
export const newSongTextChanged = (text) => ({type: 'NEW_SONG_TEXT_CHANGED', text});

export const newSongSave = () => (dispatch, getState) => {
    axios.get(`${backendUrl}/health`, {timeout: 10000})
        .then(() => {
            dispatch(newSongModalClose());
            dispatch(fetchAllSongs());
        })
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        });
};
