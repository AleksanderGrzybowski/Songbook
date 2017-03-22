import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

const Lyrics = ({title, text, goBack}) => (
    <Row>
        <Col md={6} mdPush={3}>
            <h1 className="text-center">
                <span
                    className="glyphicon glyphicon-chevron-left"
                    onClick={goBack}
                />
                {title}
            </h1>

            <p>{text}</p>
        </Col>
    </Row>
);

export default Lyrics;
