import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { customerStore } from "../../zustand/customerStore/customerStore";
import style from "./Profile.module.css";
import CustomerDetails from "./CustomerDetaills";
import CustomerForm from "./CustomerForm";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { currentCustomer, getCustomerByEmail, createCustomer, customerData } =
    customerStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails

  const email = "mail.mail.com";

  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    getCustomerByEmail(email);
    console.log("perfil ", currentCustomer);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    // Actualizar el objeto currentCustomer con los datos del formulario
    alert(JSON.stringify(data));
    createCustomer(data);
    console.log("customers", customerData);
  };
  //console.log(watch("example")); // you can watch individual input by pass the name of the input

  return isAuthenticated ? (
    <div className={style.formConteiner}>
      <h2>{user.email}</h2>
      <CustomerDetails currentCustomer={currentCustomer} />
      <CustomerForm
        currentCustomer={currentCustomer}
        onSubmit={handleFormSubmit}
      />
    </div>
  ) : (
    <h2>No Authenticated User. pleace register</h2>
  );
}
export default Profile;
