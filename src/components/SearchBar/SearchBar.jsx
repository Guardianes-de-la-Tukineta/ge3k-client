import React, { useEffect } from 'react';
import { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './SearchBar.module.css';
import { useStore } from "../../zustand/useStore/useStore";
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  //Hooks y estados
  const navigate = useNavigate()
  const [find, setFind] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(""); // Nuevo estado para la sugerencia seleccionada
 

  const [inputValue, setInputValue] = useState("");

  const {getSuggestionsFromBack, setStateWithSuggestion, suggestion} = useStore()
  //Handlers

  
  useEffect(()=>{
    setFind(inputValue)
    if(inputValue && inputValue.length  > 2){
    getSuggestionsFromBack(inputValue)}

  },[inputValue])


  useEffect(()=>{
    setFind(selectedSuggestion)

    if(selectedSuggestion.length  > 2){
    getSuggestionsFromBack(selectedSuggestion)
  }
  },[selectedSuggestion])


  useEffect(()=>{
    const arrayJustName = suggestion.map(product => product.name);
    setSuggestions(arrayJustName)
  },[suggestion])
  



  const getSuggestions = () => {
  //   if(suggestion.length > 0){
  //   const arrayJustName = suggestion.map(product => product.name);
  //   setSuggestions(arrayJustName)
  // } else{
  //     setSuggestions([])
  //   }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };


  const onSuggestionSelected = (event, { suggestionValue }) => {
    setSelectedSuggestion(suggestionValue); // Establece la sugerencia seleccionada primero
  };


  const handleChange = (event) => {
    // Actualiza el estado inputValue al escribir en el SearchBar
    setInputValue(event.target.value);
    console.log(event.target.value)
  };

  const handleSubmit = () => {    
    if (find ) {      
      setStateWithSuggestion()
      navigate(`/search/${find}`)
      setSuggestions([])
    } else {
      window.alert("No se ha ingresado ningún dato");
    }
    setFind("");   
  }

  const inputProps = {

    placeholder: "Search here!",
    value: find,
    onChange: (event) => handleChange(event),
    onKeyPress: (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    },
    className: `${style.inputSearch}`,
    "aria-label": "Search",
    ["data-bs-theme"]: "light",
    ["type"]: "search",
  };

  return (
    <div className={style.custom}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <p className={`${style.suggestionText}`}>{suggestion}</p>}
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
      <div>
        <Button
          className={`${style.buttonSearchBar}`}
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

