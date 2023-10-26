import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import TablePurchase from "../../components/TablePurchase/TablePurchase";
import FormPurchaseOrder from "../../components/FormPurchaseOrder/FromPurchaseOrder";
import { customerStore } from "../../zustand/customerStore/customerStore";
import Swal from "sweetalert2";

const PurchaseOrder = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { currentCustomer } = customerStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Muestra el mensaje de SweetAlert para no autenticados
      Swal.fire({
        title: "Log in!!",
        text: "To make a purchase, you must be logged in.",
        icon: "info",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => {
        loginWithRedirect(); // Redirige a la página de inicio de sesión
      }, 5000);
    } else if (isAuthenticated && Object.keys(currentCustomer).length === 0) {
      Swal.fire({
        // Muestra el mensaje con SweetAlert para usuarios autenticados pero sin perfil
        title: "Create your profile!!",
        text: "To make a purchase, you must register your profile.",
        icon: "info",
        timer: 5000, // 5 segundos
        timerProgressBar: true,
        showConfirmButton: false,
      });
      // Redirige después de 5 segundos
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    }
  }, [isAuthenticated, currentCustomer, navigate, loginWithRedirect]);

  if (!isAuthenticated) {
    return null; // Evita la renderización si el usuario no está autenticado
  }

  return (
    <div className="mx-5 mt-5 mb-5">
      <div className="row">
        <div className="col-md-10 mx-5 mb-5">
          <h1
            className="text-center"
            style={{ color: "#FC6522", marginBottom: "40px" }}
          >
            Confirm your purchase
          </h1>
          <FormPurchaseOrder />
          <TablePurchase />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
