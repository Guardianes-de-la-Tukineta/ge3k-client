import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TablePurchase from "../../components/TablePurchase/TablePurchase";
import FormPurchaseOrder from "../../components/FormPurchaseOrder/FromPurchaseOrder";

const PurchaseOrder = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="mx-5 mt-5 mb-5">
        <div className="row">
          <div className=" col-md-10 mx-5 mb-5">
            <h1
              className="text-center"
              style={{ color: "#FC6522", marginBottom: "40px" }}
            >
              You must log in to view the information
            </h1>
            <button
              onClick={() => loginWithRedirect()}
              className="btn btn-primary"
              style={{
                width: "20%",
                backgroundColor: "#FC6522",
                border: "none",
                color: "white",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-5 mt-5 mb-5">
      <div className="row">
        <div className=" col-md-10 mx-5 mb-5">
          <h1
            className="text-center"
            style={{ color: "#FC6522", marginBottom: "40px" }}
          >
            Confirmation of data for purchase
          </h1>

          <FormPurchaseOrder />
          <TablePurchase />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
