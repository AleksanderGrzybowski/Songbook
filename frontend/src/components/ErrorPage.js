import React from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

const ErrorPage = () => (
    <Grid>
        <Row>
            <Col md={12}>
                <Alert bsStyle="warning" style={{marginTop: '50px'}}>
                    <h4>Oops, something went wrong.</h4>
                    <p>Please <a href="#" onClick={() => window.location.reload()}>refresh</a> the page</p>
                </Alert>
            </Col>
        </Row>
    </Grid>
);

export default ErrorPage;
