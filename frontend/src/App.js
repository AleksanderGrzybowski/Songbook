import React, { Component } from 'react';
import ErrorPage from './components/ErrorPage';

class App extends Component {
    render() {
        return this.props.health.healthy ? (
                <div>
                    Backend works!
                </div>
            ) : <ErrorPage/>
    }
}

export default App;
