import React, { useState } from "react";
import styles from "./TableOrderHistory.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const TableOrderHistory = ({ data, handleCompleteOrder }) => {
  const navigate = useNavigate();
  const [orderSelected, setOrderSelected] = useState("");

  const handleCompleted = (orderId) => {
    setOrderSelected(orderId);
    console.log(orderId);
    handleCompleteOrder(orderId)
      .then(() => setOrderSelected(""))
      .catch((error) => console.log(error));
  };

  const handleMoreDetails = (id) => {
    navigate(`/admin/orders/id/${id}`);
  };

  return (
    <>
    {(data.length > 0) ? <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => {
              function cutID(id) {
                const cutedID = id.match(/^(.{4}).*?(.{4})$/);
                return `${cutedID[1]}...${cutedID[2]}`;
              }
              let dateBack = new Date(order.createdAt);
              let dateFormated = dateBack.toLocaleDateString();

              if (orderSelected === order.id) {
                console.log('entro acaa')
                return (
                  <tr key={order.id}>
                    <td>{cutID(order.id)}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{dateFormated}</td>
                    <td>
                      <Spinner animation="border" variant="success" size="sm" />
                    </td>
                    <td>
                      <Spinner animation="border" variant="success" size="sm" />
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={order.id}>
                  <td>{cutID(order.id)}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{dateFormated}</td>
                  <td>{order.status}</td>
                  <td><div className={styles.bothButton} ><button className={styles.completedButton} disabled={order.status !== 'Approved'} onClick={() => handleCompleted(order.id)}>
                  <i className="bi bi-check2-circle"></i> Completed
                    </button>
                    <button className={styles.detailButton} onClick={() => handleMoreDetails(order.id)}>
                      Details
                    </button></div> 
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table> 
    </div> : <div style={{marginTop:'9rem', fontSize:'1.5rem'}}>
    Oops, no match!</div>}</>
  );
};

export default TableOrderHistory;
