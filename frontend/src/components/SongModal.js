import React from 'react';

import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';

const SongModal = ({mode, title, text, errors, onTitleChange, onTextChange, onClose, onSave}) => {
    const isFormValid = title.length !== 0 && text.length !== 0;
    const headerText = (mode === 'create') ? 'Create new song' : 'Update song';

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
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            label="Title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Lyrics</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            placeholder="Lyrics..."
                            style={{height: '30vh'}}
                            value={text}
                            onChange={(e) => onTextChange(e.target.value)}
                        />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={onSave} disabled={!isFormValid}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default SongModal;
