import { useState} from "react";
import axios from "axios";

function useGetSuggestionFromBack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  let suggestions = [];
  
  const handleGetSuggestions = async (keyword) => {
    setLoading(true);
    if (uuidPattern.test(keyword)) {
      try {
        const URL = "https://ge3k-server.onrender.com/products/";
        suggestions = (await axios.get(URL + keyword)).data;
        setLoading(false);
        console.log(suggestions)
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error)
        setTimeout(() => {
          setError(false)
        }, 5000);
      }
    } else {
      try {
        const URL = "https://ge3k-server.onrender.com/products?name=";
        suggestions = (await axios.get(URL + keyword)).data;
        setLoading(false);
        console.log(suggestions)
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error)
        setError(error)
        setTimeout(() => {
          setError(false)
        }, 5000);
      }
    }
  };

  return { suggestions, loading, error, handleGetSuggestions };
}

export default useGetSuggestionFromBack;
