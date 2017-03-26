import React  from 'react';

import { Modal, Button } from 'react-bootstrap';

const DeleteSongModal = ({onClose, onDelete}) => (
    <Modal show={true} backdrop="static" onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure?
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onClose}>Go back</Button>
            <Button bsStyle="danger" onClick={onDelete}>Delete</Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteSongModal;
