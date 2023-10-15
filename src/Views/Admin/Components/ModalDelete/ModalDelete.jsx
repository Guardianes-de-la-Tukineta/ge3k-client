import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({title, product, setModalResponse, show}) {


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
        <Modal.Body>You're about to delete <strong>{`${product.name}`}</strong> product. Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleOk}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;