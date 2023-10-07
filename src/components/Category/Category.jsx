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
      <button className={style.btnCategory}>Categories</button>
      <div className={`row ${style.containDivs}`}>
        <div className="col-sm-6  col-12 col-lg-3 mb-4 pt-3 mt-3">
          <Link
            style={{ textDecoration: "none" }}
            to="/category/Collectible-figures"
          >
            <div className={`card mx-3 ${style.responsiveCard}`}>
              <div style={{overflow:"hidden"}}>
                <img
                  src={anime}
                  alt="anime"
                  className={`img-fluid ${style.image}`}
                />
              </div>
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Collectible Figure</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-12 col-lg-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/PC-Accesories">
            <div className={`card mx-3 ${style.responsiveCard}`}>
              <div  style={{overflow:"hidden"}}>
                <img src={pc} alt="pc" className={`img-fluid ${style.image}`} />

              </div>
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Pc Accessory</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-12 col-lg-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/Mugs">
            <div className={`card mx-3 ${style.responsiveCard}`}>
              <div style={{overflow:"hidden"}}>
                <img
                  src={taza}
                  alt="taza"
                  className={`img-fluid ${style.image}`}
                />
              </div>
              <div className={`card-body ${style.cardBody}`}>
                <h5 className={` ${style.cardTitle}`}>Mug</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-12 col-lg-3 mb-3 pt-3 mt-3">
          <Link style={{ textDecoration: "none" }} to="/category/T-shirts">
            <div className={`card mx-3 ${style.responsiveCard}`}>
              <div style={{overflow:"hidden"}}>
                <img
                  src={tshirt}
                  alt="tshirt"
                  className={`img-fluid ${style.image}`}
                />
              </div>
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
