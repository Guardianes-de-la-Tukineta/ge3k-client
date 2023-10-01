

import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './SearchBar.module.css';
import { useStore } from "../../zustand/useStore/useStore";
import Autosuggest from 'react-autosuggest';

const SearchBar = () => {

  const [ find, setFind]  = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  const store = useStore();
  const getSales = useStore((state) => state.getSales);  //obtain global state from zustand

  useEffect(() =>{
    getSales();
  },[]) 
  
  const handleChange = (event) => {
    const value = event.target.value;

    console.log(value);
    console.log(store.sales);
    setFind(value);
   
  }


  const handleSubmit = (event) => {
     if(find.length > 0){
      const results = store.sales.filter((sale) => {
       return(
       sale.name.toLowerCase().includes(find.toLowerCase()) ||
       sale.description.toLowerCase().includes(find.toLowerCase())
       )}
      )
      console.log(results[0])
         if(results.length >0){
        for(let i =0; i<results.length; i++){
         window.alert(results[i].name)
        }
        }
        else{
           window.alert("No se encontraron resultados");
        }
      }
     else{
      window.alert("No se ha ingresado ningún dato");
     }
    setFind("");
  } 

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  

    const suggestions = store.sales
       .filter((sale) => 
        sale.name.toLowerCase().includes(inputValue) ||
        sale.description.toLowerCase().includes(inputValue)
       )
       .map((sale) => sale.name);
       setSuggestions(suggestions);
  };

  const onSuggestionsFetchRequested =( {value} ) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setFind(suggestionValue);
  };

  

 const inputProps = {
 
   placeholder :"Search your product",
   value: find,
  onChange: (event) => handleChange(event),
  onKeyPress :(event) => {
    if(event.key === 'Enter'){
      handleSubmit(event);
    }
  },
    className:"border-0 rounded-0 custom-search-bar",
    "aria-label":"Search",
    ["data-bs-theme"] : "light",
    ["type"] : "search",
    "aria-label":"Search",
    ["data-bs-theme"] : "light",
    style: { 
    backgroundColor: "white",
    width: "100%",
    height: "30px",
    color: "black"}
 };

 



  return (
    //d-flex align-items-center
    <div className={style.custom}>
      <div>

    <Autosuggest 
    suggestions={suggestions}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    onSuggestionSelected={onSuggestionSelected}
    getSuggestionValue={(suggestion) => suggestion}
    renderSuggestion={(suggestion) => <div className={style.suggestionText}>{suggestion}</div>}
    inputProps={inputProps}
    renderSuggestionsContainer={({ containerProps, children }) => (
      <Form
      className={`${style.searhContainer} `}
      {...containerProps}
      >
        
        {children}
       
        
      </Form>

)}
/>
</div>
    <div>
        <Button
          className={`${style.buttonSearchBar} rounded-0`}
          onClick={(event) => handleSubmit(event)}
          type="submit"
        >
          <i className="bi bi-search"></i>
        </Button>
        </div>
  </div>
  
  
  )
}

export default SearchBar

