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

function FormCreateProfile(props) {
  const { currentCustomer, user, haveProfile } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState(!haveProfile);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    ...currentCustomer,
    password: "pasword123!",
    paymentMethod: "tarjeta de débito",
    category: "premium",
    email: user.email,
  });

  const strToDate = (str) => {
    const date = str ? parseISO(str) : null; // Convierte la fecha a un objeto Date
    return date;
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    birthdate: "",
    phone: "",
    address: "",
  });

  const { createCustomer, updateCustomer } = customerStore();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (haveProfile) {
        await updateCustomer(updatedCustomer, user.email);
      } else {
        await createCustomer(updatedCustomer);
      }

      setIsLoading(false);
      setEditing(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors(validate({ ...updatedCustomer, [name]: value }));
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
    setIsLoading(true);
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    console.log("Formatted Date", formattedDate);
    setIsLoading(true);
    setUpdatedCustomer({
      ...updatedCustomer,
      birthdate: formattedDate,
    });
  };

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
                  selected={strToDate(updatedCustomer.birthdate)}
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
                  value={user.email}
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
          {isLoading ? <h2>Loading..</h2> : " "}
          <p>Name: {currentCustomer.name}</p>
          <p>Surname: {currentCustomer.surname}</p>
          <p>Email: {user.email}</p>
          <p>Birthdate: {currentCustomer.birthdate}</p>
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
