import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useStore } from "zustand";
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore.js";
import { customerStore } from "../../zustand/customerStore/customerStore";
import axios from "axios";
import { cartStore } from "../../zustand/cartStore/cartStore.js"

const Bill = () => {
  const { deleteCart } = cartStore(); //estado de Zustand del carrito
  const [url, setUrl] = useState("");
  const [emailSend, setEmailSend] = useState(true);
  const { currentCustomer } = customerStore();
  // const order = useStore(PurchaseStore, (state) => state.order);

  const stripeOrderId = sessionStorage.getItem("propiedad");
  console.log(stripeOrderId);

  const sendEmail = () => {
    console.log("send", currentCustomer.email);

    let msj = {
      to: currentCustomer.email,
      subject:
        "Thanks for your purchase! Your invoice is being generated, please wait a moment",
      html:
        "<h2>Hello !! " +
        currentCustomer.name +
        " " +
        currentCustomer.surname +
        " <h2/>" +
        "<p>In this email, we are sending you the invoice corresponding to your purchase at the following ink:</p> <p><a href=" +
        url +
        ">View purchase invoice</a></p>  <p>Thank you for your urchase, and we hope to see you soon.</p>",
    };
    console.log("msj", msj);

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
  };

  const getBill = async () => {
    try {
      const response = await fetch(
        "https://ge3k-server.onrender.com/stripe-session/bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stripeOrderId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUrl(data.url);
        console.log(data.url);
      } else {
        console.error("Error al obtener la factura");
      }
    } catch (error) {
      console.error("Error al obtener la factura:", error);
    }
  };

  const stateOrder = async () => {
    try {
      console.log("Estoy actualizando estado de order");
      const url = await fetch(
        "https://ge3k-server.onrender.com/orders",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stripeOrderId }),
        }
      );
    } catch (error) {
      console.error("Error sending information for upgrade pay status");
    }
  }

  useEffect(() => {
    getBill();
    stateOrder();
    deleteCart();
  }, []);

  useEffect(() => {
    //es para enviar el mail cuando cambio el currentCustomer ya que en un principio tarda en cargar el usuario logueado, cuando termine de cargarlo se ejecutara el sendEmail. y controlaremos que no fue enviado antes.
    // emailSend ? sendEmail() : console.log("no necesito el email");
    sendEmail();
    setEmailSend(false);
    console.log("mail....");
  }, [currentCustomer]);

  return (
    <div className="text-center my-5">
      <h1>Here you can see/download your bill</h1>
      <p className="my-5">
        Please click on the left button for download your bill
      </p>

      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button
          style={{
            borderRadius: "10px",
            padding: "10px 5px",
            margin: "0 3px",
            backgroundColor: "#ff6824",
            border: "none",
            fontWeight: "600",
          }}
        >
          Click here please for obtain your Bill!!
        </Button>
      </a>
      <Link to="/">
        <Button
          style={{
            borderRadius: "10px",
            padding: "10px 5px",
            margin: "0 3px",
            backgroundColor: "#ff6824",
            border: "none",
            fontWeight: "600",
          }}
        >
          Go back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Bill;
