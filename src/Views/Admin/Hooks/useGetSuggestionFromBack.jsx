import {useState, useEffect} from "react";
import axios from "axios";
import useAuthToken from './useAuthToken'

function useGetSuggestionFromBack() {
  const [loading, setLoading] = useState(false);
  const [errorGetProducts, setErrorGetProducts] = useState(false);
  const [products, setProducts] = useState('')
  const [notSuggestion, setNotSuggestion] = useState(false)
  const [keywordUsed, setKeywordUsed] = useState('')
  const [byId, setById] = useState(false)
  const [order, setOrder] = useState({})
  const [byCategory, setByCategory] = useState(false)
  const [byThema,setByThema] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [productByPage, setProductByPage] = useState(10)
  const {authToken} = useAuthToken()


  useEffect(() => {
    if(authToken) getProducts();
  }, [authToken]);





//Un controlador que me maneja cuando una petición cae el catch
const handleCatchError= (error)=>{
  setLoading(false)
        if(error.response){
          if(error.message === "Request failed with status code 404"){
            setErrorGetProducts("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
          setTimeout(() => {
            setErrorGetProducts(false)
          }, 5000)
        } else if(error.response.data.message) {
          setErrorGetProducts(error.response.data.message)
          setTimeout(() => {
            setErrorGetProducts(false)
          }, 5000)
        }
        } else {
          setErrorGetProducts('Could not retrieve a response from the server. Please check your Internet connection')
          setTimeout(() => {
            setErrorGetProducts(false)
          }, 5000);
        }
}


  const handleGetSuggestions = async (keyword) => {
    const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    setLoading(true);
 
    if (uuidPattern.test(keyword)) {
      setById(keyword)
      try {
        const URL = "https://ge3k-server.onrender.com/products/";
        const {data} = await axios.get(URL + keyword, {
          headers:{
            Authorization: `Bearer ${authToken}`
          }
        });
        setOrder({})
      setByCategory(false)
      setByThema(false)
      setPageNum(1)
      setTotalPages(1)
      setKeywordUsed('')
        if(data.length === 0){
          setNotSuggestion(true)
        } else{
          setNotSuggestion(false)
        }
        setProducts([data])
        setLoading(false);
      } catch (error) {
        handleCatchError(error)
      }
    } else {
      if(byId)setById(false)
      try {
        const URL = "https://ge3k-server.onrender.com/products?name=";
        const {data} = await axios.get(URL + keyword, {
          headers:{
            Authorization: `Bearer ${authToken}`
          }
        });
        setKeywordUsed(keyword)
        if(data.length === 0){
          setNotSuggestion(true)
        } else{
          setNotSuggestion(false)
        }
        setPageNum(1)
        setTotalPages(1)
        setProducts(data)
        setLoading(false);
      } catch (error) {
        handleCatchError(error)
      }
    }
  };


  const getProducts = async (pattern) =>{

    if(byId)setById(false)
    setLoading(true);
    const URL = 'https://ge3k-server.onrender.com/products?'


    //Si pattern es "Reset" se resetean todo los estados
    if(pattern === 'Reset'){
      setOrder({})
      setByCategory(false)
      setByThema(false)
      setPageNum(1)
      setKeywordUsed('')

      try {
        const {data} = await axios.get(URL+'pageNumber=1&unitsPerPage=12',{
          headers:{
            Authorization: `Bearer ${authToken}`
          }
        });
        setProducts(data.products)
        setTotalPages(data.totalPages)
       setLoading(false);
      } catch (error) {
        handleCatchError(error)
      }

    } else {

    let pageNumber =`pageNumber=${pageNum}`;
    let unitsPerPage = `&unitsPerPage=${productByPage}`;
    let keyword = (keywordUsed)?`&name=${keywordUsed}`:'';
    let category = (byCategory) ? `&categoryName=${byCategory}` : '';
    let thema = (byThema) ? `&themeName=${byThema}` : '';
    let orderName = (order.type === 'name') ? `&nameOrder=${order.order}` : '';
    let orderPrice = (order.type === 'price') ? `&priceOrder=${order.order}` : '';

    if (pattern){
    
    if(pattern.pageNumber){
     pageNumber = `pageNumber=${pattern.pageNumber}`;
     setPageNum(pattern.pageNumber)
    }

    if(pattern.unitsPerPage){
     unitsPerPage = `&unitsPerPage=${pattern.unitsPerPage}`
     setProductByPage(unitsPerPage)
    }
    
    if(pattern.category){
      
      category = (pattern.category !== 'Reset')? `&categoryName=${pattern.category}`:''                             
      setByCategory((pattern.category !== 'Reset')?pattern.category:false)
    }

    if(pattern.thema){
      thema = (pattern.thema !== 'Reset')? `&themeName=${pattern.thema}`: '';    
      setByThema((pattern.thema !== 'Reset')?pattern.thema:false)
    }

    if(pattern.order){

      //Ordenado por nombre
      if(pattern.order === 'A-Z' || pattern.order === 'Z-A'){
        if(pattern.order === 'A-Z'){
          orderName = `&nameOrder=ASC`
          setOrder({type:'name', order:'ASC'})
        } else if(pattern.order === 'Z-A'){
          orderName = `&nameOrder=DESC`
          setOrder({type:'name', order:'DESC'})
        } 
        }
        
    //Ordenado por precio
      if(pattern.order === 'Highest price first' || pattern.order === 'Lowest price first'){
        if(pattern.order === 'Highest price first'){
          orderPrice = `&priceOrder=DESC`
          setOrder({type:'price', order:'DESC'})
        } else if(pattern.order === 'Lowest price first'){
          orderPrice = `&priceOrder=ASC`
          setOrder({type:'price', order:'ASC'})
        } 
      }
       //Resetear el orden
      if(pattern.order === 'Reset' ){
        orderName = '';
        orderPrice = '';
        setOrder({})
      }
    }
  }

  try {
    const {data} = await axios.get(URL+pageNumber+unitsPerPage+keyword+category+thema+orderName+orderPrice,{
      headers:{
        Authorization: `Bearer ${authToken}`
      }
    });
    setProducts(data.products)
    setTotalPages(data.totalPages)
   setLoading(false);
  } catch (error) {
    handleCatchError(error)
  }
  }
}

  return { products, byId, notSuggestion, loading, setLoading, errorGetProducts, pageNum, totalPages, handleGetSuggestions, getProducts};
}

export default useGetSuggestionFromBack;
