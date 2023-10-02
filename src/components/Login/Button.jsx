import { useAuth0 } from "@auth0/auth0-react";

export default function Button() {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}> Login </button>;
}
