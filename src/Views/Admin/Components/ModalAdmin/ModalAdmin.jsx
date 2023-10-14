import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAdmin({title, message, setModalResponse, show}) {


  const handleCancel = () => {
    setModalResponse(false)}

  const handleOk = () => {
    setModalResponse(true)}

  return (
    <>
      <Modal show={show} onHide={handleCancel} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdmin;