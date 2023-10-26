import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // el calendario cuando elegimos una fecha
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { parseISO } from "date-fns"; // Importa parseISO de date-fns para el formato de las fechas
import { customerStore } from "../../zustand/customerStore/customerStore";
import styles from "./Profile.module.css";
import { validate } from "./validate";
import sendEmail from "../../components/SendEmaill/send-email";

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

  const msjCreated = {
    to: updatedCustomer.email,
    subject: "welcome to ge3khub store",
    html:
      "<h2>Hello " +
      updatedCustomer.name +
      " !!  <h2/> <p>You have completed your ge3khub registration.<p/>" +
      "You can now enjoy our products.",
  };

  const msjUpd = {
    to: updatedCustomer.email,
    subject: "Profile update completed, ge3khub store",
    html:
      "<h2>Hello " +
      updatedCustomer.name +
      " !!  <h2/> <p>You have updated your ge3khub profile.<p/>" +
      "You can now enjoy our products.",
  };

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
        sendEmail(msjUpd);
      } else {
        await createCustomer(updatedCustomer);
        sendEmail(msjCreated);
      }

      setIsLoading(false);
      setEditing(false);
    } catch (error) {
      // console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("updateCus ", updatedCustomer.birthdate);
    setFormErrors(validate({ ...updatedCustomer, [name]: value }));
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
    setIsLoading(true);
    // console.log(formErrors.birthdate);
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // console.log("Formatted Date", formattedDate);
    setIsLoading(true);
    setUpdatedCustomer({
      ...updatedCustomer,
      birthdate: formattedDate,
    });
    setFormErrors(
      validate({
        ...updatedCustomer,
        birthdate: formattedDate,
      })
    );
  };

  // useEffect(()=>{
  //   if(!haveProfile){
  //     alert('cree perfil')
  //   }
  // },[haveProfile])

  return (
    <Container className="d-flex" style={{gap:'5px', flexDirection:'column'}}>
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
                {formErrors.birthdate ? <></> : ""}
                <span className={styles.error}>{formErrors.birthdate}</span>
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
        <div className={styles.data}>
          {isLoading ? <h2>Loading..</h2> : " "}
          <p>Name:<span>{currentCustomer.name}</span></p>
          <p>Surname:<span>{currentCustomer.surname}</span></p>
          <p>Email:<span>{user.email}</span></p>
          <p>Birthdate:<span>{currentCustomer.birthdate}</span></p>
          <p>Phone:<span>{currentCustomer.phone}</span></p>
          <p>Address:<span>{currentCustomer.address}</span></p>
        </div>
      )}
      {editing ? (
        haveProfile ? (
          <Button
            style={{
              backgroundColor: "#ff6824",
              width:'100px'
            }}
            className={styles.buttonBorder}
            onClick={handleSaveClick}
            disabled={Object.values(formErrors).some((error) => error !== "")}
          >
            Uptade
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: "#ff6824",
              width:'100px'
            }}
            className={styles.buttonBorder}
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
            width:'100px'
          }}
          className={styles.buttonBorder}
          onClick={handleEditClick}
        >
          Update
        </Button>
      )}
    </Container>
  );
}

export default FormCreateProfile;
