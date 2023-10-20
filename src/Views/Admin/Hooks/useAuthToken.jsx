import { useState, useEffect } from "react";

function useAuthToken() {
  const [authToken, setAuthToken] = useState(null);
  const [storedRole, setStoredRole] = useState(null);

  useEffect(() => {
    // Extraer el token del Local Storage al cargar el componente
    const storedAuthToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setStoredRole(storedRole)
    }
  }, []);

  return{authToken, storedRole};
}

export default useAuthToken;
