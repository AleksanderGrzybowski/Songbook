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

const loadSongs = (data) => ({type: 'LOAD_SONGS', songs: data});
export const fetchAllSongs = () => (dispatch) => {
    axios.get(`${backendUrl}/songs`)
        .then(({data}) => dispatch(loadSongs(data)))
        .catch(err => {
            console.log(err);
            dispatch(backendNotHealthy());
        })
};
