import axios from 'axios';
import backendUrl from './backendUrl';


const backendNotHealthy = () => (dispatch) => {
    dispatch({type: 'CLOSE_ALL_MODALS'});
    dispatch({type: 'BACKEND_HEALTH_CHECK_FAIL'});
};

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
export const unsetSelectedSong = () => ({type: 'UNSET_SELECTED_SONG'});

export const searchInputChanged = (text) => (dispatch) => {
    dispatch({type: 'SEARCH_INPUT_CHANGED', text});
    dispatch(fetchSongsFiltered(text));
};

const loadSongWithLyrics = (data) => ({type: 'LOAD_SONG_WITH_LYRICS', song: data});
const emptyLyrics = (data) => ({type: 'EMPTY_LYRICS'});
export const fetchAndDisplaySongWithLyrics = (id) => (dispatch) => {
    axios.get(`${backendUrl}/songs/${id}`)
        .then(({data}) => dispatch(loadSongWithLyrics(data)))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};

export const songModalOpen = (mode, id, title, text) => ({type: 'SONG_MODAL_OPEN', mode, id, title, text});
export const songModalClose = () => ({type: 'SONG_MODAL_CLOSE'});
export const songModalPutErrors = (errors) => ({type: 'SONG_MODAL_PUT_ERRORS', errors});
export const songModalTitleChanged = (title) => ({type: 'SONG_MODAL_TITLE_CHANGED', title});
export const songModalTextChanged = (text) => ({type: 'SONG_MODAL_TEXT_CHANGED', text});

export const songSave = () => (dispatch, getState) => {
    const {id, title, text, mode} = getState().songModal;

    let promise;
    if (mode === 'create') {
        promise = axios.post(`${backendUrl}/songs`, {title, text});
    } else if (mode === 'update') {
        promise = axios.put(`${backendUrl}/songs/${id}`, {title, text});
    } else {
        throw new Error('Invalid mode');
    }

    promise.then(({data}) => {
        dispatch(songModalClose());
        dispatch(fetchAllSongs());
        dispatch(setSelectedSong(data.id));
        dispatch(fetchAndDisplaySongWithLyrics(data.id));
    }).catch(err => {
        if (err.response.status === 400) {
            dispatch(songModalPutErrors(err.response.data.errors));
        } else {
            dispatch(backendNotHealthy());
        }
    });
};

export const deleteSongModalOpen = () => ({type: 'DELETE_SONG_MODAL_OPEN'});
export const deleteSongModalClose = () => ({type: 'DELETE_SONG_MODAL_CLOSE'});

export const deleteSong = (id) => (dispatch) => {
    axios.delete(`${backendUrl}/songs/${id}`)
        .then(() => {
            dispatch(deleteSongModalClose());
            dispatch(fetchAllSongs());
            dispatch(emptyLyrics());
            dispatch(unsetSelectedSong());
        })
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        });
};

export const importModalOpen = () => ({type: 'IMPORT_MODAL_OPEN'});
export const importModalClose = () => ({type: 'IMPORT_MODAL_CLOSE'});
export const importModalError = () => ({type: 'IMPORT_MODAL_ERROR'});

export const importModalDataChanged = (data) => ({type: 'IMPORT_MODAL_DATA_CHANGED', data});
export const importSongs = () => (dispatch, getState) => {
    let json;
    try {
        json = JSON.parse(getState().importModal.data);
    } catch (e) {
        dispatch(importModalError());
        return;
    }

    axios.post(`${backendUrl}/import`, json)
        .then(() => {
            location.reload();
        })
        .catch(err => {
            console.log(err);
            dispatch(importModalError());
        });
};
