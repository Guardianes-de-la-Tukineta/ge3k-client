import React, { useEffect, useState } from "react";
import { customerStore } from "../../../../../../zustand/customerStore/customerStore";
import { Button } from "react-bootstrap";
import styles from "./ManageUsers.module.css";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  // const history = useHistory();
  const [updateOnChanges, setUpdateOnChanges] = useState(true); //cuando realizo un cambio en este estado se realizara el useefect
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [activeFilter, setActiveFilter] = useState(true); // true para activos, false para inactivos
  const [searchTerm, setSearchTerm] = useState("");
  const {
    allCustomers,
    getAllCustomers,
    delAllCustomers,
    delCustomer,
    activateCustomer,
  } = customerStore();

  useEffect(() => {
    console.log("actualizo");
    getAllCustomers();
  }, [updateOnChanges]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCustomers = allCustomers
    .filter((customer) => (activeFilter ? !customer.deletedAt : true))
    .filter((customer) => customer.email.includes(searchTerm));

  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCustomers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    <div>
      <h4>MANAGE CUSTOMERS</h4>
      <div className={styles.filters}>
        <Button onClick={prevPage}>prevPage</Button>
        <Button onClick={nextPage}>nextPage</Button>
        <label>Hide blocked:</label>
        <input
          type="checkbox"
          checked={activeFilter}
          onChange={() => setActiveFilter(!activeFilter)}
        />
        <input
          type="text"
          placeholder="Buscar por email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {!currentItems.length > 0 && searchTerm === "" ? (
        <div style={{ padding: "100px", justifyContent: "center" }}>
          <Spinner
            style={{ padding: "100px" }}
            animation="border"
            variant="dark"
          />
        </div>
      ) : (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Category</th>
                <th>Registred Date</th>
                <th>Activo</th>
                <th>Acciones</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.birthdate}</td>
                  <td>{customer.category}</td>
                  <td>{customer.createdAt}</td>
                  <td>{customer.deletedAt ? "No" : "Yes"}</td>
                  <td>
                    {customer.deletedAt ? (
                      <Button onClick={() => hamdlerActivate(customer.id)}>
                        Activate
                      </Button>
                    ) : (
                      <Button onClick={() => hamdlerDel(customer.id)}>
                        Delete
                      </Button>
                    )}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/admin/send-email/${customer.id}`,
                        // state: {
                        //   nombre: "Ejemplo",
                        //   email: "ejemplo@example.com",
                        // },
                      }}
                    >
                      Enviar Email
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Página {currentPage} de{" "}
            {Math.ceil(filteredCustomers.length / itemsPerPage)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
