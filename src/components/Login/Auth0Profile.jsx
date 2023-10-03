import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../Profile/Profile";
import { customerStore } from "../../zustand/customerStore/customerStore";

function Auth0Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showProfile, setShowProfile] = useState(false); // Estado para mostrar/ocultar el perfil
  const { currentCustomer, getCustomerByEmail } = customerStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails
  // const customer = getCustomerByEmail(user.email);
  // const toggleProfile = () => {
  //   setShowProfile(!showProfile); // Cambiar el estado para mostrar/ocultar el perfil
  // };

  // const fetchData = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     // Ahora puedes enviar el token al servidor para verificar la autenticación.
  //     console.log("Token de acceso:", token);
  //   } catch (error) {
  //     console.error("Error al obtener el token de acceso:", error);
  //   }
  // };

  return isAuthenticated ? (
    <div>
      <h2>Bienvenido, {user.name}</h2>
      <p>Email: {user.email}</p>

      {/* Botón para mostrar/ocultar el perfil */}
      {/* <button onClick={toggleProfile}>
        {showProfile ? "Ocultar Perfil" : "Mostrar Perfil"}
      </button> */}

      {/* Mostrar el componente Profile si showProfile es true */}
      {/* {showProfile && <Profile email={user.email} />} */}

      {/* <button onClick={fetchData}>Obtener Token de Acceso</button> */}
    </div>
  ) : (
    <div>{/* <p>Por favor, inicia sesión.</p> */}</div>
  );
}

export default Auth0Profile;
