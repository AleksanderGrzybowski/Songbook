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
    currentView: 'search',
};

export const view = (state = initialStateView, action) => {
    switch (action.type) {
        case 'CHANGE_VIEW':
            return Object.assign({}, state, {currentView: action.view});
        default:
            return state;
    }
};

const initialStateSongList = {requestInProgress: false, songs: []};
export const songList = (state = initialStateSongList, action) => {
    switch (action.type) {
        case 'LOAD_SONGS_REQUEST_STARTED':
            return Object.assign({}, state, {requestInProgress: true});
        case 'LOAD_SONGS':
            return Object.assign({}, state, {requestInProgress: false, songs: action.songs});
        default:
            return state;
    }
};

const initialStateSongWithLyrics = {title: '', text: ''};
export const songWithLyrics = (state = initialStateSongWithLyrics, action) => {
    switch (action.type) {
        case 'LOAD_SONG_WITH_LYRICS':
            return action.song;
        default:
            return state;
    }
};
