import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";

export default function Logout() {
  const { logout } = useAuth0();
  // const { delCurrentCustomer } = customerStore();

  // delCurrentCustomer();
  return (
    <button
      style={{
        borderRadius: "10px",
        padding: "5px 8px",
        margin: "0px",
        backgroundColor: "#ff6824",
        border: "none",
        fontWeight: "600",
      }}
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
