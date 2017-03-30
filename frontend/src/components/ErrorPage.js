import React from 'react';
import { Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap';
import { translate } from 'react-i18next';

const ErrorPage = ({t}) => (
    <Grid>
        <Row>
            <Col md={12}>
                <Alert bsStyle="warning" style={{marginTop: '50px'}}>
                    <h4>{t('somethingWentWrong')}</h4>
                    <p style={{cursor: 'pointer'}} onClick={() => window.location.reload()}>
                        <Glyphicon glyph="refresh"/> {t('refresh')}
                    </p>
                </Alert>
            </Col>
        </Row>
    </Grid>
);

export default translate()(ErrorPage);
