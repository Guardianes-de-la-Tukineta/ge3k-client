import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEnable({title, admin, setModalResponse, show}) {


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
        <Modal.Body>You are about to create new Password for <strong>{admin && admin.name}</strong> admin user whose email address is  <strong>{admin && admin.email}</strong>.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button  onClick={handleOk}>
            Create New Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEnable;