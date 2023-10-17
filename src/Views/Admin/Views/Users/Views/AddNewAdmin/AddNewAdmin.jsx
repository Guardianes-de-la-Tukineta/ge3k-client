import React from 'react'
import FormAddAdmin from '../../../../Components/FormAddAdmin/FormAddAdmin'
import Alert from "react-bootstrap/Alert";
import useCreateNewAdmin from '../../../../Hooks/useCreateNewAdmin';

const AddNewAdmin = () => {

 const {loading, error, message, handleCreateNewAdmin } = useCreateNewAdmin()
 
  return (
    <div
      className="flex-grow-1 m-4 d-flex flex-column justify-content-center align-items-center text-center rounded mt-2"
      style={{ backgroundColor: "#dbdbdb", height: "100%" }}
    >
      <FormAddAdmin
        handleCreateNewAdmin={handleCreateNewAdmin}
        loading={loading}
      />
      {error && (
        <Alert
          key={"danger"}
          variant={"danger"}
          style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
        >
          {error}
        </Alert>
      )}
      {message && (
        <Alert
          key={"success"}
          variant={"success"}
          style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
        >
          {message}
        </Alert>
      )}
    </div>
  );
}

export default AddNewAdmin
