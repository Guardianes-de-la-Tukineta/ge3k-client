import { useState, useEffect } from "react";
import { useJwt } from "react-jwt";

function useAuthToken() {

  const [authToken, setAuthToken] = useState(null);
  const [storedRole, setStoredRole] = useState(null);

  const storedAuthToken = localStorage.getItem("token")
  const { decodedToken, isExpired } = useJwt(storedAuthToken);

  useEffect(() => {
      if (storedAuthToken && !isExpired) {
          setAuthToken(storedAuthToken);
          setStoredRole(decodedToken && decodedToken.role);
      }
  }, [decodedToken]);

  return{authToken, storedRole};
}

export default useAuthToken;
