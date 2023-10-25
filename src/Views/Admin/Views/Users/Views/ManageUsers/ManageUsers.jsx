import React, { useEffect, useState } from "react";
import { customerStore } from "../../../../../../zustand/customerStore/customerStore";
import styles from "./ManageUsers.module.css";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router-dom";
import PaginationAdminOrders from "../../../../Components/PaginationAdminOrders/PaginationAdminOrders";
import SearchBarAdmin from '../../../../Components/SearchBarAdmin/SearchBarAdmin'
import Alert from "react-bootstrap/Alert";

const ManageUsers = () => {
  // const history = useHistory();
  const [updateOnChanges, setUpdateOnChanges] = useState(true); //cuando realizo un cambio en este estado se realizara el useefect
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [activeFilter, setActiveFilter] = useState(true); // true para activos, false para inactivos
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const {
    allCustomers,
    getAllCustomers,
    delAllCustomers,
    delCustomer,
    activateCustomer,
    error,
    message
  } = customerStore();

  useEffect(() => {
    getAllCustomers();
  }, [updateOnChanges]);


  const handleReset = ()=>{
    setCurrentPage(1);
    setSearchTerm('')
  }

  const handleSentEmail = (id)=>{
    navigate(`/admin/send-email/${id}`)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCustomers = allCustomers
    .filter((customer) => (activeFilter ? !customer.deletedAt : true))
    .filter((customer) => customer.email.includes(searchTerm));

  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const hamdlerActivate = async (id) => {
    // console.log("activando ", id);
    delAllCustomers();
    await activateCustomer(id);
    await getAllCustomers();
    setUpdateOnChanges(!updateOnChanges);
    setCurrentPage(1);
  };

  const hamdlerDel = async (id) => {
    delAllCustomers();
    await delCustomer(id);
    await getAllCustomers();
    setUpdateOnChanges(!updateOnChanges);
    setCurrentPage(1);
  };

  // const hamdlerContact = (email) => {
  //   // Llama a la función sendEmail directamente en ContactButton
  //   console.log("Ejecutando el handler contact", email);
  //   getCustomerByEmail(email);
  // };

  return (
    <div
    className="flex-grow-1 d-flex flex-column"
      style={{ padding: "1rem 1.65rem" }}>
         <div
        className={`${styles.editProductContainer} container-fluid flex-grow-1`}
      >
      <h4>MANAGE CUSTOMERS</h4>
      <div className='row  justify-content-center w-100'>
        <div className='col-lg-10'>
        <div className={styles.messageSection}>
          {error && (
            <Alert key={"danger"} variant={"danger"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert key={"success"} variant={"success"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {message}
            </Alert>
          )}
        </div>
      <div className="d-flex w-100 justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex align-items-center flex-wrap">
        <button onClick={handleReset} className={styles.resetButton}>
              <i className="bi bi-arrow-clockwise"></i>{" "}
            </button>
            <button className={styles.toogleButton} onClick={() => setActiveFilter(!activeFilter)}> Show Blocked <span>{(!activeFilter)? <i className="bi bi-toggle-on"></i> : <i className="bi bi-toggle-off"></i>} </span> </button>
            </div>
       <SearchBarAdmin
            handleSearch={setSearchTerm}
            setResetDropDowns={false}
            reset={currentItems}
            placeholder={'Enter email address'}
          />
      </div>
      <div className={styles.spinerContainer} >
      {!currentItems.length > 0 && searchTerm === "" ? (
          <Spinner
          animation="border"
          variant="dark"
          style={{ height: "50px", width: "50px", margin: "10rem" }}
          />
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Category</th>
                <th>Registred Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer, index) =>{  
                
                
              let dateBack = new Date(customer.createdAt);
              let dateFormated = dateBack.toLocaleDateString();

                return (

                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.birthdate}</td>
                  <td>{customer.category}</td>
                  <td>{dateFormated}</td>
                  <td>{customer.deletedAt ? "No" : "Yes"}</td>
                  <td >
                    <div className="d-flex justify-content-center p-1 gap-1">
                    <button
                      onClick={() => hamdlerActivate(customer.id)}
                      className={(customer.deletedAt === null)? styles.saveButtonOff : styles.saveButton}
                      disabled={customer.deletedAt === null ? true : false}
                    >
                <i className="bi bi-person-check"></i>
                    </button>
                    <button
                      onClick={() => hamdlerDel(customer.id)}
                      className={(customer.deletedAt === null)? styles.deletetButton : styles.deletetButtonOff}
                      disabled={customer.deletedAt === null ? false : true}
                    >
                  <i className="bi bi-person-slash"></i>
                    </button>
                    <button
                      onClick={() => handleSentEmail(customer.id)}
                      className={ styles.passwordButton}
                    >
             <i className="bi bi-envelope"></i>
                    </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          </div>
        )}
           </div>
           </div>
           </div>
          <div className="d-flex justify-content-center mt-3">
          {(totalPages > 1) && <PaginationAdminOrders page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />}
          
     
        </div>
    </div>
    </div>
  );
};

export default ManageUsers;
