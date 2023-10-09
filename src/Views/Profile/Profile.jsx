import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import style from "./Profile.module.css";
import CustomerDetails from "./CustomerDetails"; // Cambiado el nombre del import

function Profile() {
  const { currentCustomer, getCustomerByEmail } = customerStore();
  const { customerData } = customerStore((state) => ({
    customerData: state.customerData,
  }));
  const { user, isAuthenticated } = useAuth0();

  const newCustomer = {
    name: "",
    surname: "",
    birthdate: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    paymentMethod: "",
    Category: "",
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Verificar si el usuario está autenticado
  //     const email = user.email; // Obtener el correo electrónico del usuario autenticado
  //     getCustomerByEmail(email);
  //     newCustomer.email = email;
  //   }
  // }, [user, isAuthenticated]);

  // recargo el customer

  console.log("customer", currentCustomer.name);
  // console.log("log", user);
  return (
    <div className={style.formContainer}>
      {isAuthenticated ? (
        <div>
          {user.email_verified ? (
            //si tiene perfil...

            Object.keys(currentCustomer).length !== 0 ? ( //controlo que currentCustomer no sea un objeto vacio
              <CustomerDetails
                currentCustomer={currentCustomer} //envio el customer de la BDD
                user={user} //envio el user de auth0
                haveProfile={true}
              />
            ) : (
              <CustomerDetails
                currentCustomer={{ ...newCustomer, email: user.email }} //envio un customer con datos limpios
                user={user} //envio el user de auth0
                haveProfile={false}
              />
            )
          ) : (
            <div className={style.messajeContainer}>
              <h3>
                Your email is not verified! Please check your email for
                verification instructions.
              </h3>
            </div>
          )}
        </div>
      ) : (
        <h2>No Authenticated User. Please register</h2>
      )}
    </div>
  );
}

export default Profile;
