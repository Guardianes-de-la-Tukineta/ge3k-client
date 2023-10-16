import React, { useEffect, useState } from "react";
import { customerStore } from "../../../../../../zustand/customerStore/customerStore";
import { Button } from "react-bootstrap";
const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [activeFilter, setActiveFilter] = useState(true); // true para activos, false para inactivos
  const [searchTerm, setSearchTerm] = useState("");
  const { allCustomers, getAllCustomers } = customerStore();
  // console.log("manageCustomer", allCustomers);

  useEffect(() => {
    getAllCustomers();
  }, []);

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

  return (
    <div>
      <h4>MANAGE PRODUCTS</h4>
      <div>
        <Button onClick={prevPage}>prevPage</Button>
        <Button onClick={nextPage}>nextPage</Button>
        <label>Filtrar Activos:</label>
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Birthdate</th>
            <th>Category</th>
            <th>Registred Date</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.surname}</td>
              <td>{customer.email}</td>
              <td>{customer.birthdate}</td>
              <td>{customer.category}</td>
              <td>{customer.createdAt}</td>
              <td>{customer.deletedAt ? "No" : "Yes"}</td>
              <td>
                <Button>Bolck</Button>
                <Button>Contact</Button>
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
  );
};

export default ManageUsers;
