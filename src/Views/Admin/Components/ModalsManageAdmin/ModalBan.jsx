import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBan({title, admin, setModalResponse, show}) {


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
        <Modal.Body>You're about to ban <strong>{`${admin.name}`}</strong> admin. Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleOk}>
            Ban Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBan;