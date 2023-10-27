import React from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore";
import { useEffect } from "react";
import { cartStore } from "../../zustand/cartStore/cartStore";

const PaymentSuccessView = () => {
  const { deleteCart } = cartStore(); //nos traemos estados de zustand
  const navigate = useNavigate();

  const purchaseStore = PurchaseStore();
  const order = purchaseStore.order;

  useEffect(() => {
    const delay = 4000; // 4 segundos (en milisegundos)
    deleteCart();
    const timeoutId = setTimeout(() => {
      navigate("/bill"); // Redirige al usuario a la página de factura
    }, delay);

    return () => {
      clearTimeout(timeoutId); // Limpia el temporizador en caso de que el componente se desmonte antes del tiempo de espera
    };
  }, [history]);

  useEffect(() => {
    if (order) {
      const stripeOrder = order;
      console.log(stripeOrder);
    }
  }, [order]);

  return (
    <div className="text-center my-5">
      <h1>¡The purchase has been successful!</h1>
      <p className="my-5">Thanks for your purchase!!</p>
      <p className="my-5">
        Your invoice is being generated, please wait a moment
      </p>
      <br />
      <ProgressBar animated now={100} label="Procesando..." />
      <br />
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
          className="ml-3"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccessView;
