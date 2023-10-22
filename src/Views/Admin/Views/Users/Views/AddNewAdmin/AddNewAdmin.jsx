import React, { useEffect, useState } from 'react'
import FormAddAdmin from '../../../../Components/FormAddAdmin/FormAddAdmin'
import Alert from "react-bootstrap/Alert";
import useCreateNewAdmin from '../../../../Hooks/useCreateNewAdmin';
import useAuthToken from '../../../../Hooks/useAuthToken';
import ModalNoAuth from '../../../../Components/ModalNoAuth/ModalNoAuth';


const AddNewAdmin = () => {

 const {loading, error, message, handleCreateNewAdmin } = useCreateNewAdmin()
 const {authToken, storedRole} = useAuthToken()
 const [notAuth, setNotAuth] = useState(false)


 useEffect(()=>{

  if(storedRole === 'admin'){
    console.log('cambiando')
    setNotAuth(true)
  }

 },[storedRole])


 
  return (
    <div
      className="flex-grow-1 m-4 d-flex flex-column justify-content-center align-items-center text-center rounded mt-2"
      style={{ backgroundColor: "#dbdbdb", height: "100%" }}
    >
     {notAuth && <ModalNoAuth/>}
      {!notAuth && <FormAddAdmin
        handleCreateNewAdmin={handleCreateNewAdmin}
        loading={loading}
      />}
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
