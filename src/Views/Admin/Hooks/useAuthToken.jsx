import { useState, useEffect } from "react";

function useAuthToken() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Extraer el token del Local Storage al cargar el componente
    const storedAuthToken = localStorage.getItem("token");
    console.log(storedAuthToken)
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  return{authToken};
}

export default useAuthToken;
