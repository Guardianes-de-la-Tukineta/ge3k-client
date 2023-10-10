import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { useEffect } from "react";

export default function Logout() {
  const { logout, user, isAuthenticated } = useAuth0();
  const { getCustomerByEmail } = customerStore();

  useEffect(() => {
    if (isAuthenticated) {
      // Verificar si el usuario está autenticado
      const email = user.email; // Obtener el correo electrónico del usuario autenticado
      getCustomerByEmail(email);
    }
  }, [user]);

  // delCurrentCustomer();
  return (
    <button
      style={{display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', padding:'7.5px 15px', margin:'10px 3px 0px 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600', height:'30%'}}
      onClick={() => logout()}
    >
      {" "}
      <i
        className="bi bi-box-arrow-right"
        style={{ fontSize: "1.2em" }}
      ></i>{" "}
    </button>
  );
}
