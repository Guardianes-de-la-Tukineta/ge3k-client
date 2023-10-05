import React from 'react';
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
  const { allProducts } = useStore((state) => ({ //nos traemos la variable global
    allProducts: state.allProducts
  }))  

  const {getSuggestionsFromBack, setStateWithSuggestion, suggestion, currentProducts} = useStore()
  //Handlers

  const handleChange = (event) => {

    const { value } = event.target;
    setFind(value);

    getSuggestions(value)  
    getSuggestionsFromBack(value) 
  }  

  const handleSubmit = () => {    
    if (find ) {      
      setStateWithSuggestion()
      navigate(`/search/${find}`)

      
    } else {
      window.alert("No se ha ingresado ningún dato");
    }
    setFind("");   
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const suggestions = allProducts
      .filter((all) =>
        all.name.toLowerCase().includes(inputValue)
         || all.description.toLowerCase().includes(inputValue)
      )
      .slice(0, 10)  //limit de ammount of suggestions
      .map((all) => all.name);
    setSuggestions(suggestions);
  };

  // const getSuggestions = async (value) => {
  //   await getSuggestionsFromBack(value) //Pido las coincidencias al back y seteo los estados globales con las coincidencias
  //   setSuggestions(allProducts.slice(0,10).map((all)=>all.name)); //Seteo como sugerencia locales currentProducts
  // };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setFind(suggestionValue);
  };

  const inputProps = {

    placeholder: "Search your geek product here!",
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

