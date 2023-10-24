import React, { useState, useEffect } from "react";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore";
import { customerStore } from "../../zustand/customerStore/customerStore";
import style from "./TablePurchase.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const TablePurchase = () => {
  const [showCartInfo, setShowCartInfo] = useState(false);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const { ordersByCustomer, orderDetail } = PurchaseStore();
  const { cart, subTotal } = cartStore(); // estado conectado con localStorage
  const { loadCurrentCustomer, authenticatedCustomer } = customerStore();
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({
    id: "",
  });
  const { getOrdersByCustomer, getOrderDetail } = PurchaseStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentCustomer(user.email); // Cargar el cliente por email
    }
  }, [isAuthenticated, user.email]);

  useEffect(() => {
    if (authenticatedCustomer) {
      setUserData(authenticatedCustomer);
    }
  }, [authenticatedCustomer]);

  useEffect(() => {
    const fetchOrders = () => {
      if (authenticatedCustomer) {
        setUserData(authenticatedCustomer);
        getOrdersByCustomer(authenticatedCustomer.id);
      }
    };

    fetchOrders();
  }, [authenticatedCustomer]);

  const toggleCartInfo = () => {
    setShowCartInfo(!showCartInfo);
  };

  const handleOrderDetailsClick = (orderId, index) => {
    getOrderDetail(orderId);
    toggleOrderInfo(index);
  };

  const toggleOrderInfo = (index) => {
    setExpandedOrderIndex(index === expandedOrderIndex ? null : index);
  };

  return (
    <div className="col-12">
      <h4
        style={{
          color: "#FC6522",
          fontWeight: "700",
          paddingBottom: "20px",
          paddingTop: "40px",
        }}
      >
        Current purchase
      </h4>
      <table className={`${style.table} table table-hover table-dark `}>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Date of purchase</th>
            <th scope="col">Quantity products</th>
            <th scope="col">Total price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{new Date().toLocaleDateString()}</td>
            <td>{cart.reduce((total, { quantity }) => total + quantity, 0)}</td>
            <td>${subTotal}</td>
            <td>
              <button
                onClick={toggleCartInfo}
                style={{
                  width: "80%",
                  padding: "2%",
                  backgroundColor: "#FC6522",
                  border: "none",
                  color: "white",
                  borderRadius: "30px",
                  fontWeight: "500",
                }}
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showCartInfo && (
        <div className="bg-primary">
          <table className="table table-hover table-dark ">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ product, quantity }) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt="image"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.price * quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h4
        style={{
          color: "#FC6522",
          fontWeight: "700",
          paddingBottom: "20px",
          paddingTop: "40px",
        }}
      >
        Shopping history
      </h4>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date of purchase</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Address</th>
            <th>Status</th>
            <th>Detail</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {ordersByCustomer.map((order, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.name}</td>
                <td>{order.surname}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    onClick={() => {
                      handleOrderDetailsClick(order.id);
                      toggleOrderInfo(index);
                    }}
                    style={{
                      width: "100%",
                      padding: "2%",
                      backgroundColor: "#FC6522",
                      border: "none",
                      color: "white",
                      borderRadius: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Detail
                  </button>
                </td>
                <td>
                  {order.urlBill ? ( // Comprueba si hay una URL en order.urlBill
                    <Link to={order.urlBill} target="_blank">
                      <button
                        style={{
                          width: "80%",
                          padding: "2%",
                          backgroundColor: "#FC6522",
                          border: "none",
                          color: "white",
                          borderRadius: "30px",
                          fontWeight: "500",
                        }}
                      >
                        Invoice
                      </button>
                    </Link>
                  ) : null}
                </td>
              </tr>
              {expandedOrderIndex === index && orderDetail.products && (
                <tr key={`details-${index}`}>
                  <td colSpan="8">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetail.products.map((product, productIndex) => (
                          <tr key={`product-${productIndex}`}>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: "40px", height: "40px" }}
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>${product.subtotal}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="3"></td>
                          <td>Total:</td>
                          <td>${orderDetail.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePurchase;
