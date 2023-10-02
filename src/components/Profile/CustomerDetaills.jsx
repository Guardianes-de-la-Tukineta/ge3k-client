import React from "react";

function CustomerDetails({ currentCustomer }) {
  return (
    <div>
      <h1>Customer Details</h1>
      {/* <p>ID: {currentCustomer.id}</p> */}
      <p>Name: {currentCustomer.name}</p>
      <p>Surname: {currentCustomer.surname}</p>
      <p>Birthdate: {currentCustomer.birthdate}</p>
      <p>Email: {currentCustomer.email}</p>
      <p>Phone: {currentCustomer.phone}</p>
      <p>Address: {currentCustomer.address}</p>
      {/* Otras propiedades del cliente aquí */}
    </div>
  );
}

export default CustomerDetails;
