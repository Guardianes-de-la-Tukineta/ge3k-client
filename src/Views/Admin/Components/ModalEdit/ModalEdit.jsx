import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEdit({title, product, setModalResponse, show}) {


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
        <Modal.Body>You are about to edit the information of <strong>{product}</strong> product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleOk}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;