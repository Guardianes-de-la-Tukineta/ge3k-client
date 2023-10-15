import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../../Views/Profile/Profile";
import { customerStore } from "../../zustand/customerStore/customerStore";

function Auth0Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const [showProfile, setShowProfile] = useState(false); // Estado para mostrar/ocultar el perfil
  // const { currentCustomer, getCustomerByEmail } = customerStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails

  return isAuthenticated ? (
    <div>
      <h2>Bienvenido, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <div>{/* <p>Por favor, inicia sesión.</p> */}</div>
  );
}

export default Auth0Profile;
