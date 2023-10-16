import React, { useState, useEffect } from "react";
import style from "./Filters.module.css";
import { useStore } from "../../zustand/useStore/useStore";
import axios from "axios";

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
    getAllCategories,
    categories,
    getAllThemes,
    themes,
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

  useEffect(() => {
    getAllThemes();
    getAllCategories();
    console.log("categories", categories);
  }, []);

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

  const themeArray = themes;
  const ThemeFilter = () => {
    if (!nameThematic || nameCategory) {
      return (
        <div className="d-flex flex-column align-items-start mb-4">
          <span className={style.title}>THEMES</span>
          <div className={style.line}></div>
          {themeArray.map((themeItem) => (
            <label key={themeItem} htmlFor={themeItem}>
              <input
                type="radio"
                id={themeItem}
                name="Themes"
                value={themeItem}
                onChange={handleFilterByTheme}
                checked={theme === themeItem}
              />{" "}
              <span>{themeItem}</span>
            </label>
          ))}
        </div>
      );
    }
  };

  const categoryArray = categories;
  const CategoryFilter = () => {
    if (nameThematic || !nameCategory) {
      return (
        <div className="d-flex flex-column align-items-start mb-4">
          <span className={style.title}>CATEGORIES</span>
          <div className={style.line}></div>
          {categoryArray.map((item) => (
            <label key={item} htmlFor={item}>
              <input
                type="radio"
                id={item}
                name="Category"
                value={item}
                onChange={handleFilterByCategory}
                checked={category === item}
              />{" "}
              <span>{item}</span>
            </label>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <CategoryFilter />
      <ThemeFilter />
      {/* <PirceFilter /> */}
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
