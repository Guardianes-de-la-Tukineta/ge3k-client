import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import styles from './contactForm.module.css'

const ContactForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const sendEmail = (data) => {
    console.log("send", data);

    let msj = {
      to: "pariohernan@gmail.com",
      subject: "Tenemos un intento de contacto de " + data.email,
      html:
        "<h2>Hello !!  <h2/> <p>datos del contacto. <p/>" +
        JSON.stringify(data),
    };

    (async () => {
      // Invoca la función asíncrona inmediatamente
      try {
        const response = await axios.post(
          "https://ge3k-server.onrender.com/send-email/",
          msj,
          {
            headers: {
              "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
            },
          }
        );
        // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
        if (response.status >= 200 && response.status < 300) {
          console.log("mensaje enviado");
        } else {
          // Maneja el caso en el que la solicitud no fue exitosa
          console.log("La solicitud no fue exitosa:", response.status);
        }
      } catch (error) {
        // Maneja los errores de la solicitud
        console.log("error. This email not envied");
      }
    })();
    reset();
  };

  const onSubmit = (data) => {
    sendEmail(data);
  };

  const isButtonDisabled = () => {
    const values = getValues();
    // Comprueba si todos los campos requeridos están llenos
    return Object.keys(errors).length > 0;
  };

  return (
    <Container style={{ padding: "2em" }}>
      <h3 className="text-center">Contact Us</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={3}>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "required field" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Name" />
                )}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="surname"
                control={control}
                rules={{ required: "required field" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Surname" />
                )}
              />
              {errors.surname && <p>{errors.surname.message}</p>}
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "required field",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Email" />
                )}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="Phone"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Phone" />
                )}
              />
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="Address"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Address" />
                )}
              />
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="City"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="City" />
                )}
              />
            </Form.Group>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Country" />
                )}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group style={{ paddingTop: "2px" }}>
              <Controller
                name="assubject"
                control={control}
                rules={{ required: "required field" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Subject" />
                )}
              />
              {errors.assubject && <p>{errors.assubject.message}</p>}
            </Form.Group>
            <Form.Group style={{ height: "106%", paddingTop: "4px" }}>
              <Controller
                name="mensaje"
                style={{ height: "90%" }}
                control={control}
                rules={{ required: "required field" }}
                render={({ field }) => (
                  <Form.Control
                    as="textarea"
                    {...field}
                    placeholder="Messaje"
                    style={{ height: "80%" }}
                  />
                )}
              />
              {errors.mensaje && <p>{errors.mensaje.message}</p>}
            </Form.Group>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button
              type="submit"
              disabled={isButtonDisabled()}
              className={styles.button}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ContactForm;
