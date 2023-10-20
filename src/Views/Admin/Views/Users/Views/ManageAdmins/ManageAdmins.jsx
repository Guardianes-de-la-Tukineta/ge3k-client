import React, { useState, useEffect} from 'react'
import useGetAdminsFromBack from '../../../../Hooks/useGetAdminsFromBack'
import TableManageAdmins from '../../../../Components/TableManageAdmins/TableManageAdmins'
import Spinner from 'react-bootstrap/Spinner';
import SearchBarAdmin from '../../../../Components/SearchBarAdmin/SearchBarAdmin'
import styles from './ManageAdmins.module.css'
import Alert from "react-bootstrap/Alert";
import useAuthToken from '../../../../Hooks/useAuthToken';
import ModalNoAuth from '../../../../Components/ModalNoAuth/ModalNoAuth';

const ManageAdmins = () => {

  const {authToken, storedRole} = useAuthToken()
 const [notAuth, setNotAuth] = useState(false)


 useEffect(()=>{

  if(storedRole === 'admin'){
    setNotAuth(true)
  }

 },[storedRole])


  const {admins, loading, resetSearhBar, errorGetAdmins, message, handleBan, handleUnban, handleGetSuggestions, getAdmin} = useGetAdminsFromBack()
  return (
    <div
      className="flex-grow-1 m-4 d-flex  flex-column align-items-center text-center rounded mt-2 p-4"
      style={{ backgroundColor: "#dbdbdb", height: "100%" }}
    >
        {notAuth && <ModalNoAuth/>}
      <h4 className="mt-2">MANAGAE ADMINS</h4>
      <div className='row  justify-content-center w-100'>
        <div className='col-lg-8'>
      <div className={styles.messageSection}>
        {errorGetAdmins && (
          <Alert
            key={"danger"}
            variant={"danger"}
            style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
          >
            {errorGetAdmins}
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
      <div className={styles.navBar} >
        <button onClick={getAdmin} className={styles.resetButton}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <SearchBarAdmin
          placeholder={"Enter a email"}
          reset={resetSearhBar}
          handleSearch={handleGetSuggestions}
        />
      </div>
      {!notAuth && (loading ? (
        <Spinner
          animation="border"
          variant="dark"
          style={{ height: "50px", width: "50px", margin: "5rem" }}
        />
      ) :  <TableManageAdmins
          data={admins}
          handleBan={handleBan}
          handleUnban={handleUnban}
        /> )
      }
      </div>
      </div>
    </div>
  );
}

export default ManageAdmins
