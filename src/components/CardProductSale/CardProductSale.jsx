import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./CardProductSale.module.css";
import { Link } from "react-router-dom";

const CardProductSale = ({ name, price, rating, image, id }) => {
  const [isFav, setIsFav] = useState(false);

  const handlerIsFav = () => {
    isFav ? setIsFav(false) : setIsFav(true);
  };

  const buttonStyle = {
    width: "300px",
    backgroundColor: "#FC6522",
    borderColor: "#ff6824",
    color: "white",
  };

  return (
    <div className="card" style={{ paddingTop: "20px" }}>
      <div className="card-body w-100 h-100 mb-4">
        <div className="row">
          <div className="col-md-4">
            <Link style={{ textDecoration: "none" }} to="/product/:id">
              <img src={image} alt="image" className="img-fluid" />
            </Link>
          </div>
          <div className="col-md-8">
            <h1 className={`mb-0 ${styles.title}`}>{name}</h1>
            <p className={`mb-0 ${styles.rating}`}>{rating}</p>
            <h2 className={`mb-0 ${styles.price}`}>{price}</h2>

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
              <Button style={buttonStyle}>
                <i className="bi bi-cart me-1"></i>Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductSale;
