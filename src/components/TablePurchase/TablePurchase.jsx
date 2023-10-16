import React, { useState } from "react";
import { cartStore } from "../../zustand/cartStore/cartStore";
import style from "./TablePurchase.module.css";

const TablePurchase = () => {
  const [showCartInfo, setShowCartInfo] = useState(false);
  const toggleCartInfo = () => {
    setShowCartInfo(!showCartInfo);
  };

  const { cart, subTotal } = cartStore(); // estado conectado con localStorage

  return (
    <div className="col-12">
      <table className={`${style.table} table table-hover table-dark `}>
        <thead>
          <tr>
            <th scope="col">#</th>
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
                  width: "60%",
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
    </div>
  );
};

export default TablePurchase;
