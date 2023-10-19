import React, { useState, useEffect } from "react";
import axios from "axios";


const useGetCategoriesAndThemes = () => {

    const [categories, setCategories] = useState(false)
    const [themas, seThemas] = useState(false)
    const [errorGetCatgeoryAndThema, setErrorGetCatgeoryAndThema] = useState('')
  


useEffect(()=>{

    const URLc = 'https://ge3k-server.onrender.com/categories';
    const URLt = 'https://ge3k-server.onrender.com/themes';

    Promise.all([axios.get(URLc), axios.get(URLt)])
    .then(([categoriesData, themesData]) => {
      setCategories(categoriesData.data);
      seThemas(themesData.data);
    })
    .catch((error) => {
      if (error.response) {
        setErrorGetCatgeoryAndThema("Seems like we're experiencing technical difficulties. Please contact our support for assistance");
      }
    });
},[])



  return ({categories, themas, errorGetCatgeoryAndThema})
}

export default useGetCategoriesAndThemes
