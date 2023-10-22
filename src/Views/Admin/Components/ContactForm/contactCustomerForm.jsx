import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { customerStore } from "../../../../zustand/customerStore/customerStore";
import { useParams } from "react-router-dom";
import axios from "axios";

const ContactCustomerForm = () => {
  const { id } = useParams();
  //   getCustomerById(id);
  console.log("contact customer", id);
  //   console.log("name customer", currentCustomer.name);
  const { getCustomerById, currentCustomer, restoreCurrentCustomer } =
    customerStore();

  useEffect(() => {
    async function fetchData() {
      try {
        // Puedes usar await aquí para realizar operaciones asincrónicas
        getCustomerById(id);
        // Hacer algo con la respuesta
      } catch (error) {
        // Manejar errores
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData(); // Llama a la función asincrónica inmediatamente
    return () => {
      // Esta función se ejecutará cuando el componente se desmonte
      console.log("El componente se desmontó");
      restoreCurrentCustomer();
      // Puedes realizar tareas de limpieza aquí, como cancelar suscripciones, limpiar temporizadores, etc.
    };
  }, [id]);

  //   console.log("cust name", currentCustomer);

  const email = currentCustomer.email;

  const [formData, setFormData] = useState({
    name: currentCustomer.name + " " + currentCustomer.surname,
    email: email,
    message: "",
  });

  const send = () => {
    let msj = {
      to: formData.email,
      subject: "contacto desde ge3khub",
      html: formData.message,
    };
    console.log(msj);

    (async () => {
      // Invoca la función asíncrona inmediatamente
      try {
        const response = await axios.post(
          "http://localhost:3000/send-email",
          msj,
          {
            headers: {
              "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
            },
          }
        );
        // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
        if (response.status >= 200 && response.status < 300) {
          window.alert("mensaje enviado");
        } else {
          // Maneja el caso en el que la solicitud no fue exitosa
          console.error("La solicitud no fue exitosa:", response.status);
        }
      } catch (error) {
        // Maneja los errores de la solicitud
        window.alert("error. This email not envied");
      }
    })();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
    setFormData({
      name: currentCustomer.name + " " + currentCustomer.surname,
      email: email,
      message: "",
    });
    console.log("Datos del formulario:");
  };

  return (
    <div>
      <h2>Contact by email</h2>
      <Container className="contact-form">
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentCustomer.name + " " + currentCustomer.surname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo Electrónico:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mensaje:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8} // Ajusta la altura del campo de mensaje
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
          {/* <Col xs={12} md={4}>
          <h2>Cabecera del Correo</h2>
          /* Otros elementos de la cabecera, si es necesario * /
        </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default ContactCustomerForm;
