import React, { Component } from 'react';
import { Row, Col, Grid, FormGroup, FormControl } from 'react-bootstrap';

export default class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    handleChange = (e) => {
        const query = e.target.value;
        this.setState({query: query});
        this.props.fetchSongsFiltered(query)
    };

    render() {
        return (
            <h1 className="text-center">
                <FormGroup bsSize="large">
                    <FormControl
                        type="text"
                        placeholder="Search..."
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </FormGroup>
            </h1>

        )
    }
}
