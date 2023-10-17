import { useState, useEffect } from "react";
import axios from "axios";

function useGetAdminsFromBack() {
  const [loading, setLoading] = useState(false);
  const [errorGetAdmins, setErrorGetAdmins] = useState(false);
  const [admins, setAdmins] = useState("");
  const [notSuggestion, setNotSuggestion] = useState(false);
  const [keywordUsed, setKeywordUsed] = useState("");
  const [byId, setById] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      await getAdmin();
    };
    fetchAdmins();
  }, []);


  
  const handleGetSuggestions = async (keyword) => {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    setLoading(true);

    if (uuidPattern.test(keyword)) {
      setById(keyword);
      try {
        const URL = "https://ge3k-server.onrender.com/products/";
        const { data } = await axios.get(URL + keyword);
        setOrder({});
        setByCategory(false);
        setByThema(false);
        setPageNum(1);
        setKeywordUsed("");
        if (data.length === 0) {
          setNotSuggestion(true);
        } else {
          setNotSuggestion(false);
        }
        setProducts([data]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setErrorGetProducts(error);
        setTimeout(() => {
          setErrorGetProducts(false);
        }, 5000);
      }
    } else {
      if (byId) setById(false);
      try {
        const URL = "https://ge3k-server.onrender.com/products?name=";
        const { data } = await axios.get(URL + keyword);
        setKeywordUsed(keyword);
        if (data.length === 0) {
          setNotSuggestion(true);
        } else {
          setNotSuggestion(false);
        }
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setErrorGetProducts(error);
        setTimeout(() => {
          setErrorGetProducts(false);
        }, 5000);
      }
    }
  };

  const getAdmin = async () => {
    setLoading(true);
    const URL = "https://ge3k-server.onrender.com/admin/";

    try {
      const { data } = await axios.get(URL);
      console.log(data)
      setAdmins(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorGetAdmins(error);
      setTimeout(() => {
        setErrorGetAdmins(false);
      }, 5000);
    }
  };

  return {
    admins,
    byId,
    notSuggestion,
    loading,
    setLoading,
    errorGetAdmins,
    handleGetSuggestions,
    getAdmin,
  };
}

export default useGetAdminsFromBack;
