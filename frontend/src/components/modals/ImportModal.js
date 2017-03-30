import React from 'react';

import { Modal, Button, Alert } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader-input';
import { translate } from 'react-i18next';
import FileInfo from './FileInfo';

const ImportModal = ({data, isError, onDataChange, onClose, onImport, t}) => {
    const errorAlert = isError ? (
        <Alert bsStyle="danger">
            <p>{t('importError')}</p>
        </Alert>
    ) : null;

    const onFileChange = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => onDataChange(e.target.result);
        reader.readAsText(file);
    };

    return (
        <Modal show={true} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{t('importSongs')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('importWarning')}</p>
                {errorAlert}
                <FileReaderInput as="text" id="my-file-input" onChange={(_, arg) => onFileChange(arg[0][1])}>
                    <Button block>{t('selectImportFile')}...</Button>
                </FileReaderInput>
                <FileInfo data={data}/>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={onImport} disabled={data.length === 0}>
                    {t('performImport')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default translate()(ImportModal);
