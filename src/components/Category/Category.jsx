import React from "react";
import style from "../Category/Category.module.css";
import pc from "../../Images/pc accessory.jpg";
import anime from "../../Images/anime.jpg";
import taza from "../../Images/61sqeu1pqdL.jpg";
import tshirt from "../../Images/camiseta.jpg";
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
        <div className="col-md-3 mb-3 pt-3 mt-3 ">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-3">
              <img
                src={anime}
                alt="anime"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Collectible figure</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-3">
              <img src={pc} alt="pc" className={`img-fluid ${style.image}`} />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Pc Accessory</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-3">
              <img
                src={taza}
                alt="taza"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Mug</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/:nameCategory">
            <div className="card mx-3">
              <img
                src={tshirt}
                alt="tshirt"
                className={`img-fluid ${style.image}`}
              />
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>T - Shirt</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
