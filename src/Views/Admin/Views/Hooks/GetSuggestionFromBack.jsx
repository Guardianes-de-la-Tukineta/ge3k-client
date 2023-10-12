import { useState, useEffect } from "react";
import axios from "axios";

function GetSuggestionFromBack(keyword) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Realiza una solicitud al backend para buscar coincidencias basadas en la palabra clave
    // Reemplaza esto con tu lógica de solicitud real
    fetch(`/backend-search?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [keyword]);

  return { results, loading };
}

export default GetSuggestionFromBack;
