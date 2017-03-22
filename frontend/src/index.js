import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { health, view, songList } from './reducers';
import { healthCheck, changeView, fetchAllSongs, fetchSongsFiltered } from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    combineReducers({health, view, songList}),
    applyMiddleware(thunk, createLogger())
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    onViewChange: (viewName) => dispatch(changeView(viewName)),
    fetchSongsFiltered: (query) => dispatch(fetchSongsFiltered(query))
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
