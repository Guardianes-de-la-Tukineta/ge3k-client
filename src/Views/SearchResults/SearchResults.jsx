import React from "react";
import CardConatiner from "../../components/CardContainer/CardContainer";
import Filters from "../../components/Filters/Filters";
import SortPriceDropDown from "../../components/SortPriceDropDown/SortPriceDropDown";
import { useParams } from "react-router-dom";
import style from "./SearchResults.module.css";
import { useStore } from "../../zustand/useStore/useStore";
import { useEffect, useRef } from "react";

const SearchResults = () => {
  const { query } = useParams();

  const {
    resetAll,
    getSuggestionsFromBack,
    setStateWithSuggestion,
    suggestion,
    currentProducts
  } = useStore(); //obtain action from zustand
  const firstUpdate = useRef(true);
  const firtsRequest = useRef(true)
  const firstSuggestionInCurrentProductd = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    return () => {
      resetAll();
    };
  }, []);

  return (
    <>
      {currentProducts.length === 0 ? (
        <div className="container-fluid p-0">
          <h1 className={style.titleH1}>😥 Oops!, no Ge3k matches...</h1>
          <h4 className="text-center m-5">Try searching for another geek product!</h4>
        </div>
      ) : (
        <div className="container-fluid p-0">
          <h1 className={style.titleH1}>🧐 You've found a Ge3k treasure!</h1>
          <div className={style.categoryDescription}>
            <p>
              <strong>Results for "{query}" search:</strong>{" "}
            </p>
          </div>

          <div className={`container-fluid ${style.categoryContainer}`}>
            <div
              className={`${style.dropDownContainer} d-flex justify-content-end`}
            >
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
      )}
    </>
  );
};

export default SearchResults;
