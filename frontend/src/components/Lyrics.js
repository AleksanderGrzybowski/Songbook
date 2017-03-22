import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class Lyrics extends Component {
    render() {
        return (
            <Row>
                <Col md={6} mdPush={3}>
                    <h1 className="text-center">
                        <span
                            className="glyphicon glyphicon-chevron-left"
                            aria-hidden="true"
                            onClick={this.props.goBack}
                        />
                        {this.props.title}
                    </h1>

                    <p>
                        {this.props.text}
                    </p>
                </Col>
            </Row>
        )
    }
}
