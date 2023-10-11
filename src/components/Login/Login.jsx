import Button from "./Button";
import Logout from "./Logout";
import Profile from "../../Views/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0Profile from "./Auth0Profile";

function Login() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isAuthenticated ? <Logout /> : <Button />}
      {isLoading ? (
        <span>....</span>
      ) : (
        <>
          <Auth0Profile />
        </>
      )}
    </>
  );
}

export default Login;
