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

const initialStateSongList = {songs: []};
export const songList = (state = initialStateSongList, action) => {
    switch (action.type) {
        case 'LOAD_SONGS':
            return Object.assign({}, state, {songs: action.songs});
        default:
            return state;
    }
};
