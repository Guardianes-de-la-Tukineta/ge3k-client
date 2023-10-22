import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./CardProductSale.module.css";
import { Link } from "react-router-dom";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";

const CardProductSale = ({ name, price, image, id }) => {
  const [isFav, setIsFav] = useState(false);
  const { addProductToCart, setVisibility } = cartStore();
  const { isAuthenticated } = useAuth0();
  const { currentCustomer } = customerStore();

  const handlerIsFav = (e) => {
    e.stopPropagation();
    isFav ? setIsFav(false) : setIsFav(true);
  };

  const handlerCart = (e) => {
    e.stopPropagation();
    addProductToCart(isAuthenticated || false, currentCustomer.id, {
      name,
      id,
      image,
      price,
    });
    setVisibility(true);
  };

  const buttonStyle = {
    width: "300px",
    backgroundColor: "#FC6522",
    borderColor: "#ff6824",
    color: "white",
  };

  return (
    <div className="card">
      <div className="card-body d-flex flex-column w-100 h-100 mb-1 mt-1">
        <div className="row">
          <div className="col-md-4">
            <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
              <img src={image} alt="image" className="img-fluid" />
            </Link>
          </div>
          <div className="col-md-8">
            <h1
              className={`mb-3 ${styles.title}`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </h1>
            <h2 className={`mb-3 ${styles.price}`}>${price}</h2>

            <div className="d-flex align-items-center">
              <button
                className={`${styles.fav} ${isFav ? styles.favActive : ""}`}
                onClick={handlerIsFav}
              >
                <i
                  className={`bi ${
                    isFav ? "bi-suit-heart-fill" : "bi-suit-heart"
                  } ${styles.favIcon}`}
                ></i>
              </button>
              <hr className={styles.hr} />
              <Button onClick={(e) => handlerCart(e)} style={buttonStyle}>
                <i className="bi bi-cart me-3"></i>Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductSale;
