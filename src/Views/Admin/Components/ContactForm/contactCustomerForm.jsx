import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { customerStore } from "../../../../zustand/customerStore/customerStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./contactCustomerForm.module.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const ContactCustomerForm = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

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

  const send = async () => {
    let msj = {
      to: email,
      subject: "contact from ge3khub",
      html: formData.message,
    };
    console.log(msj);

    // Invoca la función asíncrona inmediatamente
    try {
      const response = await axios.post(
        // "https://nodemail-production-704c.up.railway.app/send-email",
        "https://ge3k-server.onrender.com/send-email",
        msj,
        {
          headers: {
            "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
          },
        }
      );
      // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
      if (response.status >= 200 && response.status < 300) {
        // window.alert("mensaje enviado");
        setLoading(false);
      } else {
        // Maneja el caso en el que la solicitud no fue exitosa
        console.error("La solicitud no fue exitosa:", response.status);
        setLoading(false);
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      setLoading(false);
      setError("Error. This email not envied");
      setTimeout(() => {
        setError(false);
      }, 5000);
      throw new Error();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await send();
      setFormData({
        name: currentCustomer.name + " " + currentCustomer.surname,
        email: email,
        message: "",
      });
      setMessage("Email sent successfully");
      setTimeout(() => {
        setMessage(false);
      }, 3500);
    } catch (error) {}
  };

  return (
    <div
      className="container-fluid d-flex flex-column flex-grow-1 justify-content-around w-100"
      style={{ paddingBottom: "1rem", marginTop: "0.75rem" }}
    >
      <div
        className="flex-grow-1 m-4 d-flex flex-column justify-content-center align-items-center text-center rounded mt-2"
        style={{ backgroundColor: "#dbdbdb", height: "100%" }}
      >
        <div
          className={`container-fluid`}
          style={{ padding: "1rem 2.4rem", borderRadius: " 4px" }}
        >
          <div className={`row ${style.rowContainer}`}>
            <div className="d-flex" style={{ margin: " 0 auto" }}>
              {error && (
                <div style={{ margin: "1rem 0  -30px 0" }}>
                  <Alert
                    key={"danger"}
                    variant={"danger"}
                    style={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {error}
                  </Alert>{" "}
                </div>
              )}
              {message && (
                <div style={{ margin: "1rem 0  -30px 0" }}>
                  {" "}
                  <Alert
                    key={"success"}
                    variant={"success"}
                    style={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {message}
                  </Alert>
                </div>
              )}
            </div>
            <div className="d-flex align-items-center flex-wrap">
              <button
                onClick={() => navigate(-1)}
                className={style.resetButton}
              >
                <i
                  className="bi bi-arrow-left-circle"
                  style={{ marginRight: "5px" }}
                ></i>{" "}
                Back
              </button>
            </div>
            <Form
              onSubmit={handleSubmit}
              className={`col-md-7 ${style.AddProductForm}`}
            >
              <h4>CONTACT BY EMAIL</h4>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentCustomer.name + " " + currentCustomer.surname}
                  onChange={handleChange}
                  required
                  className={style.input}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className={style.input}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8} // Ajusta la altura del campo de mensaje
                  className={style.textArea}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {!loading ? (
                  "Sumbit"
                ) : (
                  <Spinner animation="border" variant="light" />
                )}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCustomerForm;
