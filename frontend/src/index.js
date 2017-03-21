import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { health, songList } from './reducers';
import { healthCheck, fetchAllSongs } from './actions';
import App from './App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    combineReducers({health, songList}),
    applyMiddleware(thunk, createLogger())
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({});

const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

store.dispatch(healthCheck());
store.dispatch(fetchAllSongs());
