import React from "react";
import { useState} from "react";
import style from "./Filters.module.css";
import { useStore } from "../../zustand/useStore/useStore";
import { useEffect } from "react";



const Filters = ({nameCategory, nameThematic}) => {
 
  const {maxPrice, category, brand, getAllProductsByCategory, getAllProductsByTheme, filterProducts, setFilters } = useStore();
  const [maxPriceRange, setMaxPriceRange] = useState(0);



  useEffect(()=>{

    if(nameCategory){
      getAllProductsByCategory(nameCategory)
      
    } else if (nameThematic) {
      getAllProductsByTheme(nameThematic)

    }

  }, [])


useEffect(() => {
  if(maxPriceRange === 0 || maxPriceRange === '0'){
    setMaxPriceRange(maxPrice.toString());
}
}, [maxPrice]);


  const handleFilterByCategory = (ev) => {

    setFilters((prevState) => ({
      ...prevState, category: ev.target.value
   }))
   filterProducts()
  }


  const handleFilterByTheme = (ev) => {

   setFilters(prevState => ({
       ...prevState, 
       brand: ev.target.value
   }));
  
   filterProducts()
  }


  const handleFilterByPrice = (ev) => {

    setFilters((prevState) => ({
       ...prevState, maxPrice: parseFloat(ev.target.value)
    }))

    filterProducts()
    
  }


  return (
    <div>
      {( nameThematic|| !nameCategory) && <div className="d-flex flex-column align-items-start mb-4">
        <span className={style.title}>CATEGORIES</span>
        <div className={style.line}></div>

        <label htmlFor="all">
        <input type="radio" id="all" name="category" value="all" onChange={handleFilterByCategory} checked={category === 'all'} /> <span>All</span> 
        </label>

        <label htmlFor="laptops">
        <input type="radio" id="laptops" name="category"  value="laptops" onChange={handleFilterByCategory}/> <span>laptops</span> 
        </label>

        <label htmlFor="smartphones">
        <input type="radio" id="smartphones" name="category"  value="smartphones" onChange={handleFilterByCategory}/> <span>smartphones</span>
      
        </label>

        <label htmlFor="skincare">
        <input type="radio" id="skincare" name="category"  value="skincare" onChange={handleFilterByCategory}/> <span>skincare</span>
         
        </label>

        <label htmlFor="groceries">
        <input type="radio" id="groceries" name="category"   value="groceries" onChange={handleFilterByCategory}/> <span>groceries</span>
          
        </label>
      </div>}

      { (nameCategory || !nameThematic ) && <div className="d-flex flex-column align-items-start mb-4">
        <span className={style.title}>THEMES</span>
        <div className={style.line}></div>

        <label htmlFor="all">
        <input type="radio" id="all"  name="Themes" value="all" onChange={handleFilterByTheme} checked={brand === 'all'}  /> <span>All</span>
          
        </label>

        <label htmlFor="Huawei">
        <input type="radio" id="Huawei"  name="Themes" value="Huawei" onChange={handleFilterByTheme}/> <span>Huawei</span>
          
        </label>

        <label htmlFor="Apple">
        <input type="radio" id="Apple"   name="Themes"  value="Apple" onChange={handleFilterByTheme}/>  <span>Apple</span>
          
        </label>

        <label htmlFor="Samsung">
        <input type="radio" id="Samsung"  name="Themes" value="Samsung" onChange={handleFilterByTheme}/>  <span>Samsung</span>
          
        </label>
      </div>}



      <div className="d-flex flex-column align-items-start mb-4">
        <span className={style.title}>PRICE RANGE</span>
        <div className={style.line}></div>
        <label htmlFor="range-price"> </label>
        <span>$0 - ${maxPrice} </span>
        <input type="range" min="0" max={maxPriceRange} id="range-price" value={maxPrice} onChange={handleFilterByPrice} className="w-100"/>
       
      </div>
    </div>



  );
};

export default Filters;
