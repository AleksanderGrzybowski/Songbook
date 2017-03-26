const initialStateHealth = {healthy: true};
export const health = (state = initialStateHealth, action) => {
    switch (action.type) {
        case 'BACKEND_HEALTH_CHECK_FAIL':
            return Object.assign({}, state, {healthy: false});
        case 'BACKEND_HEALTH_CHECK_SUCCESS':
            return Object.assign({}, state, {healthy: true});
        default:
            return state;
    }
};

const initialStateView = {
    currentView: 'main',
};

export const view = (state = initialStateView, action) => {
    switch (action.type) {
        case 'CHANGE_VIEW':
            return Object.assign({}, state, {currentView: action.view});
        default:
            return state;
    }
};

const initialStateSearchInput = '';
export const searchInput = (state = initialStateSearchInput, action) => {
    switch (action.type) {
        case 'SEARCH_INPUT_CHANGED':
            return action.text;
        default:
            return state;
    }
};

const initialStateSongList = {requestInProgress: false, songs: [], selectedSongId: null};
export const songList = (state = initialStateSongList, action) => {
    switch (action.type) {
        case 'LOAD_SONGS_REQUEST_STARTED':
            return Object.assign({}, state, {requestInProgress: true});
        case 'LOAD_SONGS':
            return Object.assign({}, state, {requestInProgress: false, songs: action.songs});
        case 'SET_SELECTED_SONG':
            return Object.assign({}, state, {selectedSongId: action.id});
        case 'UNSET_SELECTED_SONG':
            return Object.assign({}, state, {selectedSongId: null});
        default:
            return state;
    }
};

const initialStateSongWithLyrics = {isPresent: false, title: '', text: ''};
export const songWithLyrics = (state = initialStateSongWithLyrics, action) => {
    switch (action.type) {
        case 'LOAD_SONG_WITH_LYRICS':
            return Object.assign({}, {title: action.song.title, text: action.song.text, isPresent: true});
        case 'EMPTY_LYRICS':
            return initialStateSongWithLyrics;
        default:
            return state;
    }
};

const initialStateSongModal = {visible: false, mode: '', id: 0, title: '', text: ''};
export const songModal = (state = initialStateSongModal, action) => {
    switch (action.type) {
        case 'SONG_MODAL_OPEN':
            return Object.assign({}, state, {visible: true, mode: action.mode, id: action.id, title: action.title || '', text: action.text || ''});
        case 'SONG_MODAL_CLOSE':
            return Object.assign({}, state, {visible: false, mode: '', id: 0, title: '', text: ''});
        case 'SONG_MODAL_TITLE_CHANGED':
            return Object.assign({}, state, {title: action.title});
        case 'SONG_MODAL_TEXT_CHANGED':
            return Object.assign({}, state, {text: action.text});
        default:
            return state;
    }
};

const initialStateDeleteSongModal = {visible: false, id: 0};
export const deleteSongModal = (state = initialStateDeleteSongModal, action) => {
    switch (action.type) {
        case 'DELETE_SONG_MODAL_OPEN':
            return Object.assign({}, state, {visible: true, id: action.id});
        case 'DELETE_SONG_MODAL_CLOSE':
            return Object.assign({}, state, {visible: false, id: 0});
        default:
            return state;
    }
};
