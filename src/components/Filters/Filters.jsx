import React from "react";
import { useState } from "react";
import style from "./Filters.module.css";
import { useStore } from "../../zustand/useStore/useStore";
import { useEffect } from "react";


const Filters = ({ nameCategory, nameThematic }) => {
  const {
    initialMaxPrice,
    maxPrice,
    category,
    theme,
    getAllProductsByCategory,
    getAllProductsByTheme,
    filterProducts,
    setFilters,
  } = useStore();
  const [maxPriceRange, setMaxPriceRange] = useState("0");

  useEffect(() => {
    if (nameCategory) {
      getAllProductsByCategory(nameCategory);
    } else if (nameThematic) {
      getAllProductsByTheme(nameThematic);
    }
  }, [nameCategory, nameThematic]);

  useEffect(() => {
    setMaxPriceRange(initialMaxPrice.toString());
  }, [initialMaxPrice]);

  const handleFilterByCategory = (ev) => {
    setFilters((prevState) => ({
      ...prevState,
      category: ev.target.value,
    }));
    filterProducts();
  };

  const handleFilterByTheme = (ev) => {
    setFilters((prevState) => ({
      ...prevState,
      theme: ev.target.value,
    }));

    filterProducts();
  };

  const handleFilterByPrice = (ev) => {
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: parseFloat(ev.target.value),
    }));

    filterProducts();
  };

  return (
    <div>
      {(nameThematic || !nameCategory) && (
        <div className="d-flex flex-column align-items-start mb-4">
          <span className={style.title}>CATEGORIES</span>
          <div className={style.line}></div>

          <label htmlFor="all">
            <input
              type="radio"
              id="all"
              name="category"
              value="all"
              onChange={handleFilterByCategory}
              checked={category === "all"}
            />{" "}
            <span>All</span>
          </label>

          <label htmlFor="T-shirts">
            <input
              type="radio"
              id="T-shirts"
              name="category"
              value="T-shirts"
              onChange={handleFilterByCategory}
            />{" "}
            <span>T-shirts</span>
          </label>

          <label htmlFor="Mugs">
            <input
              type="radio"
              id="Mugs"
              name="category"
              value="Mugs"
              onChange={handleFilterByCategory}
            />{" "}
            <span>Mugs</span>
          </label>

          <label htmlFor="PC-Accesories">
            <input
              type="radio"
              id="PC-Accesories"
              name="category"
              value="PC Accesories"
              onChange={handleFilterByCategory}
            />{" "}
            <span>PC Accesories</span>
          </label>

          <label htmlFor="Collectible figures">
            <input
              type="radio"
              id="Collectible figures"
              name="category"
              value="Collectible figures"
              onChange={handleFilterByCategory}
            />{" "}
            <span>Collectible Figures</span>
          </label>
        </div>
      )}

      {(nameCategory || !nameThematic) && (
        <div className="d-flex flex-column align-items-start mb-4">
          <span className={style.title}>THEMES</span>
          <div className={style.line}></div>

          <label htmlFor="all">
            <input
              type="radio"
              id="all"
              name="Themes"
              value="all"
              onChange={handleFilterByTheme}
              checked={theme === "all"}
            />{" "}
            <span>All</span>
          </label>

          <label htmlFor="Programming">
            <input
              type="radio"
              id="Programming"
              name="Themes"
              value="Programming"
              onChange={handleFilterByTheme}
            />{" "}
            <span>Programming</span>
          </label>

          <label htmlFor="Gaming">
            <input
              type="radio"
              id="Gaming"
              name="Themes"
              value="Gaming"
              onChange={handleFilterByTheme}
            />{" "}
            <span>Gaming</span>
          </label>

          <label htmlFor="Anime">
            <input
              type="radio"
              id="Anime"
              name="Themes"
              value="Anime"
              onChange={handleFilterByTheme}
            />{" "}
            <span>Anime</span>
          </label>

          <label htmlFor="Video Games">
            <input
              type="radio"
              id="Video Games"
              name="Themes"
              value="Video Games"
              onChange={handleFilterByTheme}
            />{" "}
            <span>Video Games Based</span>
          </label>
        </div>
      )}

      <div className="d-flex flex-column align-items-start mb-4">
        <span className={style.title}>PRICE RANGE</span>
        <div className={style.line}></div>
        <label htmlFor="range-price"> </label>
        <span>$0 - ${maxPrice} </span>
        <input
          type="range"
          min="0"
          max={maxPriceRange}
          id="range-price"
          value={maxPrice}
          onChange={handleFilterByPrice}
          className="w-100"
        />
      </div>
    </div>
  );
};

export default Filters;
