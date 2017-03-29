import React from 'react';

import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';

const SongModal = ({mode, title, text, errors, onTitleChange, onTextChange, onClose, onSave, t}) => {
    const isFormValid = title.length !== 0 && text.length !== 0;
    const headerText = t((mode === 'create') ? 'createNewSong' : 'editSong');

    const errorAlert = errors.length > 0 ? (
        <Alert bsStyle="danger">
            <ul>
                {errors.map(e => <li key={e.message}>{e.message}</li>)}
            </ul>
        </Alert>
    ) : null;

    return (
        <Modal show={true} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorAlert}
                <form>
                    <FormGroup>
                        <ControlLabel>{t('songTitle')}</ControlLabel>
                        <FormControl
                            type="text"
                            label={t('songTitle')}
                            placeholder={t('songTitle')}
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>{t('songLyrics')}</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            placeholder="..."
                            style={{height: '30vh'}}
                            value={text}
                            onChange={(e) => onTextChange(e.target.value)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={onSave} disabled={!isFormValid}>
                    {t('save')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default translate()(SongModal);
