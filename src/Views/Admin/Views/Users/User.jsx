import React from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import AddNewAdmin from "./Views/AddNewAdmin/AddNewAdmin";
import ManageUsers from "./Views/ManageUsers/ManageUsers";
import ManageAdmins from "./Views/ManageAdmins/ManageAdmins";
import UsersPanel from "../../Components/UsersPanel/UsersPanel";
import ContactForm from "./../../Components/ContactForm/contactCustomerForm";

const Users = () => {
  const location = useLocation();
  const showProductsPanel = location.pathname === "/admin/users";

  return (
    <div
      className="container d-flex flex-column flex-grow-1 justify-content-around"
      style={{ paddingBottom: "1rem" }}
    >
      

      { showProductsPanel && <div>
        <UsersPanel />
      
    </div>}
      <Routes>
        <Route path="manage" element={<ManageUsers />} />
        <Route path="manage-admin" element={<ManageAdmins />} />
        <Route path="add-admin" element={<AddNewAdmin />} />
        <Route path="send-email/:id" element={<ContactForm />} />
      </Routes>

    </div>
  );
};

export default Users;
