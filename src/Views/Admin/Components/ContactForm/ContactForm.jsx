import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    // Aquí puedes manejar el envío de datos del formulario
    console.log(data);
  };

  const isButtonDisabled = () => {
    const values = getValues();
    // Comprueba si todos los campos requeridos están llenos
    return Object.values(values).some((value) => !value);
  };

  return (
    <Container>
      <h3 className="text-center">Contact Us</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Controller
                name="nombres"
                control={control}
                rules={{ required: "Campo requerido" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Nombres" />
                )}
              />
              {errors.nombres && <p>{errors.nombres.message}</p>}
            </Form.Group>
            <Form.Group>
              <Controller
                name="apellidos"
                control={control}
                rules={{ required: "Campo requerido" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Apellidos" />
                )}
              />
              {errors.apellidos && <p>{errors.apellidos.message}</p>}
            </Form.Group>
            <Form.Group>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Campo requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  },
                }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Email" />
                )}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Teléfono" />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Dirección" />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Controller
                name="ciudad"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Ciudad" />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Controller
                name="pais"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="País" />
                )}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group>
              <Controller
                name="asunto"
                control={control}
                rules={{ required: "Campo requerido" }}
                render={({ field }) => (
                  <Form.Control {...field} placeholder="Asunto" />
                )}
              />
              {errors.asunto && <p>{errors.asunto.message}</p>}
            </Form.Group>
            <Form.Group>
              <Controller
                name="mensaje"
                control={control}
                rules={{ required: "Campo requerido" }}
                render={({ field }) => (
                  <Form.Control
                    as="textarea"
                    {...field}
                    placeholder="Messaje"
                  />
                )}
              />
              {errors.mensaje && <p>{errors.mensaje.message}</p>}
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={isButtonDisabled()} className="mt-3">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
