import React from 'react'
import CardConatiner from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filters";
import SortPriceDropDown from "../../components/SortPriceDropDown/SortPriceDropDown";
import { useParams } from "react-router-dom";
import style from "./SearchResults.module.css";
import { useStore } from '../../zustand/useStore/useStore';
import { useEffect } from 'react';

const SearchResults = () => {
  const { query } = useParams();   
  const {resetAll,getSuggestionsFromBack}= useStore() //obtain action from zustand
  
  useEffect(() => { 
    getSuggestionsFromBack(query)   //cuando monta componente 
    return () => { 
      resetAll()    //cuando desmonta
    };
  },[query]); 

  return (
    <div className="container-fluid p-0">

      <h1 className={style.titleH1}>
        🧐 You've found a Ge3k treasure!
      </h1>
      <div className={style.categoryDescription}>
        <p>
          <strong>Results for "{query}" search:</strong> </p>
      </div>

      <div className={`container-fluid ${style.categoryContainer}`}>

        <div className={`${style.dropDownContainer} d-flex justify-content-end`}>
          <SortPriceDropDown />
        </div>

        <div className="row p-3">
          <div className="col-md-3">
            <Filters />
          </div>

          <div className="col-md-9">
            <CardConatiner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults
