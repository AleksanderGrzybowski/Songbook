import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

const Lyrics = ({isPresent, title, text}) => {
    const content = isPresent ? (
        <div>
            <h1 className="text-center">
                {title}
            </h1>

            <p>{text}</p>
        </div>
    ) : (
        <div/>
    );
    
    return (
        <Row>
            <Col md={6} mdPush={3}>
                {content}
            </Col>
        </Row>
    );
};

export default Lyrics;
