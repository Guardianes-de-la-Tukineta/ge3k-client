import React from "react";
import styles from "./CardProduct.module.css";

const CardProduct = ({ name, price, rating, image, id }) => {
  return (
    <div className="card w-100 h-100">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <img src={image} alt="image" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1 className={`mb-0 ${styles.title}`}>{name}</h1>
            <p className={`mb-0 ${styles.rating}`}>{rating}</p>
            <h1 className={`mb-0 ${styles.price}`}>{price}</h1>
            <div className="colum">
              <hr />
              <button className={styles.button_sale}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
