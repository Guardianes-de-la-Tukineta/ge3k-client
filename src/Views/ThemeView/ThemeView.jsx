import React from "react";
import CardConatiner from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filters";
import SortPriceDropDown from "../../components/SortPriceDropDown/SortPriceDropDown";
import { useParams  } from "react-router-dom";
import style from "./ThemeView.module.css";


const ThemeView = () => {

  const {nameThematic} = useParams();

  return (
    <div className="container-fluid p-0">
      
      
      <h1 className={style.titleH1}>
        GEEK {nameThematic.toUpperCase()}
      </h1>
      <div className={style.categoryDescription}>
  

<p>At Ge3kHub.shop, <strong>we share your passion for {nameThematic}</strong>, and we are dedicated to providing you with products that allow you to express your love for this theme in a special way. Browse through our store and immerse yourself in the wonderful universe of <strong>{nameThematic}</strong>!</p>


      </div>
      
      <div className={`container-fluid ${style.categoryContainer}`}>

      <div className={`${style.dropDownContainer} d-flex justify-content-end`}>
        <SortPriceDropDown />
      </div>

      <div className="row p-3">
        <div className="col-md-3">
          <Filters nameThematic={nameThematic} />
        </div>

        <div className="col-md-9">
          <CardConatiner />
        </div>
      </div>
      </div>
    </div>
  )
}

export default ThemeView
