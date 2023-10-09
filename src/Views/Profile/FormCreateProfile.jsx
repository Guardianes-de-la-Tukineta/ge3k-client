import React, { useState } from "react";
import DatePicker from "react-datepicker"; // el calendario cuando elegimos una fecha
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { parseISO } from "date-fns"; // Importa parseISO de date-fns para el formato de las fechas
import { customerStore } from "../../zustand/customerStore/customerStore";
import styles from "./Profile.module.css";
import { validate } from "./validate";
import { format } from "date-fns";

function FormCreateProfile(props) {
  const { currentCustomer, user, haveProfile } = props;
  console.log("tiene perfil:", haveProfile, currentCustomer);
  const [editing, setEditing] = useState(!haveProfile);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    ...currentCustomer,
    password: "pasword123!",
    paymentMethod: "tarjeta de débito",
    category: "premium",
    email: user.email,
    birthdate: currentCustomer.birthdate
      ? parseISO(currentCustomer.birthdate)
      : null, // Convierte la fecha a un objeto Date
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    birthdate: "",
    phone: "",
    address: "",
  });

  const { createCustomer } = customerStore();

  const handleEditClick = () => {
    setEditing(true);
    // console.log("!!cstomr DATA: ", customerData);
  };

  const handleSaveClick = () => {
    haveProfile
      ? console.log("UPDATEAR PROFILE")
      : createCustomer(updatedCustomer);
    // updatedCustomer(updatedCustomer)

    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors(validate({ ...updatedCustomer, [name]: value }));
    // console.log("Errores", formErrors);
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    //console.log("Date", date); // Actualiza la fecha de nacimiento con la nueva fecha seleccionada
    setUpdatedCustomer({
      ...updatedCustomer,
      birthdate: date,
    });
  };

  //defino estilos para el button

  return (
    <Container>
      {editing ? (
        <>
          <div>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updatedCustomer.name}
                  onChange={handleInputChange}
                />
                <span className={styles.error}>{formErrors.name}</span>
              </Form.Group>
              <Form.Group controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={updatedCustomer.surname}
                  onChange={handleInputChange}
                />
                <span className={styles.error}>{formErrors.surname}</span>
              </Form.Group>
              <Form.Group controlId="birthdate">
                <Form.Label>Birthdate </Form.Label>
                <br />
                <DatePicker
                  selected={updatedCustomer.birthdate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className={styles.customDatePicker}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={updatedCustomer.email}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={updatedCustomer.phone}
                  onChange={handleInputChange}
                />
                <span className={styles.error}>{formErrors.phone}</span>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={updatedCustomer.address}
                  onChange={handleInputChange}
                />
                <span className={styles.error}>{formErrors.address}</span>
              </Form.Group>
            </Form>
          </div>
        </>
      ) : (
        <>
          <p>Name: {currentCustomer.name}</p>
          <p>Surname: {currentCustomer.surname}</p>
          <p>Email: {currentCustomer.email}</p>
          <p>
            Birthdate:{" "}
            {currentCustomer.birthdate ? currentCustomer.birthdate : ""}
          </p>

          <p>Phone: {currentCustomer.phone}</p>
          <p>Address: {currentCustomer.address}</p>
        </>
      )}

      {editing ? (
        haveProfile ? (
          <Button
            style={{
              backgroundColor: "#ff6824",
              marginTop: "15px",
            }}
            variant="primary"
            onClick={handleSaveClick}
            disabled={Object.values(formErrors).some((error) => error !== "")}
          >
            {console.log(currentCustomer)}
            Uptade
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: "#ff6824",
              marginTop: "15px",
            }}
            variant="primary"
            onClick={handleSaveClick}
            disabled={Object.values(formErrors).some((error) => error !== "")}
          >
            {console.log(currentCustomer)}
            Create
          </Button>
        )
      ) : (
        <Button
          style={{
            backgroundColor: "#ff6824",
          }}
          onClick={handleEditClick}
          className={styles.customButton}
        >
          Update
        </Button>
      )}
    </Container>
  );
}

export default FormCreateProfile;
