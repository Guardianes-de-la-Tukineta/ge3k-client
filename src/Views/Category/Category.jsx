import React from "react";
import CardConatiner from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filters";
import SortPriceDropDown from "../../components/SortPriceDropDown/SortPriceDropDown";
import { useParams  } from "react-router-dom";
import style from "./Category.module.css";

const Category = () => {
  const {nameCategory} = useParams();

  return (
    <div className="container-fluid p-0">
      
      
      <h1 className={style.titleH1}>
        GEEK {nameCategory.toUpperCase()}
      </h1>
      <div className={style.categoryDescription}>
      <p>
      <strong>Explore our collection and discover high-quality {nameCategory}</strong> items that will transport you to imaginary worlds, bring a nostalgic smile to your face, or help you showcase your passion for <strong>{nameCategory}</strong>. Whether you're looking for a special gift or simply want to add something cool to your personal collection, you're in the right place!</p>
      </div>
      
      <div className={`container-fluid ${style.categoryContainer}`}>

      <div className={`${style.dropDownContainer} d-flex justify-content-end`}>
        <SortPriceDropDown />
      </div>

      <div className="row p-3">
        <div className="col-md-3">
          <Filters nameCategory={nameCategory} />
        </div>

        <div className="col-md-9">
          <CardConatiner />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Category;
