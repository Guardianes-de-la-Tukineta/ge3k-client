import Button from "./Button";
import Logout from "./Logout";
import Profile from "../Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0Profile from "./auth0Profile";
function Login() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      Ge3kHub Login
      {isAuthenticated ? <Logout /> : <Button />}
      {isLoading ? (
        <h1>Cargando....</h1>
      ) : (
        <>
          <Auth0Profile />
        </>
      )}
    </>
  );
}

export default Login;
