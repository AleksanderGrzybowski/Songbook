import React, { Component } from 'react';

import { Row, Col, Grid, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const NewSongModal = ({title, text, onTitleChange, onTextChange, onClose, onSave}) => {
    const isFormValid = title.length !== 0 && text.length !== 0;

    return (
        <Modal show={true} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add new song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

export default NewSongModal;
