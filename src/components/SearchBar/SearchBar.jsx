import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './SearchBar.module.css';
import { useStore } from "../../zustand/useStore/useStore";
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate()
  const [find, setFind] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const store = useStore();
  // const getSales = useStore((state) => state.getSales);  //obtain global state from zustand
  // const getAllProducts = useStore((state) => state.getAllProducts);

  // useEffect(() => {
  //   getSales();
  //   getAllProducts();
  // }, [])

  const handleChange = (event) => {
    const value = event.target.value;
    setFind(value);
  }

  const handleSubmit = (event) => {
    if (find.length > 0) {
      const results = store.allProducts.filter((all) => {
        return (
          all.name.toLowerCase().includes(find.toLowerCase())
          || all.description.toLowerCase().includes(find.toLowerCase())
        )
      }
      )     
      if (results.length > 0) {
        store.setSearchProducts(results) // si encontramos resultados ejecutamos la action, para modificar las variables globales con los datos encontrados
        navigate(`/search/${find}`)
      }
      else {
        window.alert("No se encontraron resultados");
      }
    }
    else {
      window.alert("No se ha ingresado ningún dato");
    }
    setFind("");
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions = store.allProducts
      .filter((all) =>
        all.name.toLowerCase().includes(inputValue)
        || all.description.toLowerCase().includes(inputValue)
      )
      .slice(0, 10)  //limit de ammount of suggestions
      .map((all) => all.name);
    setSuggestions(suggestions);
  };

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

    placeholder: "Search your product",
    value: find,
    onChange: (event) => handleChange(event),
    onKeyPress: (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    },
    className: "border-0 rounded-0 custom-search-bar",
    "aria-label": "Search",
    ["data-bs-theme"]: "light",
    ["type"]: "search",
    "aria-label": "Search",
    ["data-bs-theme"]: "light",
    style: {
      backgroundColor: "white",
      width: "100%",
      height: "35px",
      color: "black",
      textAlign: "center",
    }
  };





  return (
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

