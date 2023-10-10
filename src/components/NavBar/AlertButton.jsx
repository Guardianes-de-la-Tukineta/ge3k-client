import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

function AlertButton() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAlertShow = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <i onClick={handleModalShow} className="bi bi-exclamation-diamond"></i>

      {/* Botón para mostrar el Modal */}
      {/* <Button variant="primary" onClick={handleModalShow}>
        Mostrar Modal
      </Button> */}

      {/* Botón para mostrar el Alert */}
      {/* <Button variant="warning" onClick={handleAlertShow}>
        Mostrar Alert
      </Button> */}

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ejemplo de Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Este es un ejemplo de Modal utilizando react-bootstrap en React.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert */}
      <Alert
        variant="warning"
        show={showAlert}
        onClose={handleAlertClose}
        dismissible
      >
        Este es un ejemplo de Alert utilizando react-bootstrap en React.
      </Alert>
    </div>
  );
}

export default AlertButton;
