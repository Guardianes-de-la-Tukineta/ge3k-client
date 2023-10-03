import React from "react";
import style from "../Category/Category.module.css";
import Funko from "../../Images/descarga.jpg";
import taza from "../../Images/61sqeu1pqdL.jpg";
import camiseta from "../../Images/camiseta.jpg";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className={`container-fluid ${style.textura}`}>
      <Link to="/category/:nameCategory">
        <button className={style.btnCategory}>Categories</button>
      </Link>
      <div
        className={`container d-flex justify-content-center align-items-center ${style.cards}`}
      >
        <div className="col-md-4 ">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-2">
              <img
                src={Funko}
                alt="funko"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Collectible figurines</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 ">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-2">
              <img
                src={camiseta}
                alt="camiseta"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Clothing</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-2">
              <img
                src={taza}
                alt="taza"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>
                  Home and office accessories
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
