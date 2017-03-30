import React  from 'react';
import { Modal, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';

const DeleteSongModal = ({onClose, onDelete, id, t}) => (
    <Modal show={true} backdrop="static" onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{t('confirmation')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{t('areYouSure')}</Modal.Body>

        <Modal.Footer>
            <Button onClick={onClose}>{t('goBack')}</Button>
            <Button bsStyle="danger" onClick={() => onDelete(id)}>{t('delete')}</Button>
        </Modal.Footer>
    </Modal>
);

export default translate()(DeleteSongModal);
