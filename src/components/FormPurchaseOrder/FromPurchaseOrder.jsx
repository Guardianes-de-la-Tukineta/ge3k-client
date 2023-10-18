import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore";
import style from "./FormPurchase.module.css";

const FormPurchaseOrder = () => {
  const { loadCurrentCustomer, authenticatedCustomer } = customerStore();
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    birthdate: "",
    phone: "",
  });
  const { CreatedOrder } = PurchaseStore();

  useEffect(() => {
    if (isAuthenticated && user.email) {
      loadCurrentCustomer(user.email);
    }
  }, [isAuthenticated, user.email]);

  useEffect(() => {
    if (authenticatedCustomer) {
      setUserData(authenticatedCustomer);
    }
  }, [authenticatedCustomer]);

  const handleCreatePurchaseOrder = () => {
    CreatedOrder({
      customerId: authenticatedCustomer.id,
      base_url: "http://localhost:5173/",
      name: userData.name,
      surname: userData.surname,
      birthdate: userData.birthdate,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      status: "",
    });
  };

  return (
    <div className="mb-3">
      <form className=" col-6">
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="name" className="mr-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className="mr-2">
                Address
              </label>
              <input
                type="address"
                id="address"
                name="address"
                value={userData.address}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="surname" className>
                Surname
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={userData.surname}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone" className>
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={userData.phone}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="birthdate" className>
                Birthdate
              </label>
              <input
                type="birthdate"
                id="birthdate"
                name="birthdate"
                value={userData.birthdate}
                readOnly
                className="form-control"
                style={{ fontWeight: "700" }}
              />
            </div>
          </div>
        </div>
      </form>
      <button
        className={style.buttonConfirm}
        style={{ marginLeft: "843px" }}
        onClick={handleCreatePurchaseOrder}
      >
        Pay
      </button>
    </div>
  );
};

export default FormPurchaseOrder;
