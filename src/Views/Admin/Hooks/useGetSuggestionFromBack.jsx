import { useEffect, useState} from "react";
import axios from "axios";

function useGetSuggestionFromBack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState('')
  const [notSuggestion, setNotSuggestion] = useState(false)
  const [keywordUsed, setKeywordUsed] = useState('')


  const [order, setOrder] = useState({})
  const [byCategory, setByCategory] = useState(false)
  const [byThema,setByThema] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [productByPage, setProductByPage] = useState(10)


  const handleGetSuggestions = async (keyword) => {
    const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    setLoading(true);
    setKeywordUsed(keyword)
    if (uuidPattern.test(keyword)) {
      try {
        const URL = "https://ge3k-server.onrender.com/products/";
        const {data} = await axios.get(URL + keyword);
        setOrder({})
      setByCategory(false)
      setByThema(false)
      setPageNum(1)
      setKeywordUsed('')
        if(data.length === 0){
          setNotSuggestion(true)
        } else{
          setNotSuggestion(false)
        }
        setProducts([data])
        setLoading(false);
        console.log(data)
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
        const {data} = await axios.get(URL + keyword);
        if(data.length === 0){
          setNotSuggestion(true)
        } else{
          setNotSuggestion(false)
        }
        setProducts(data)
        setLoading(false);
        console.log(data)
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


  const getProducts = async (pattern) =>{
    console.log('entro al get producto')
    console.log(byCategory)

    setLoading(true);
    const URL = 'https://ge3k-server.onrender.com/products?'


    if(pattern === 'Reset'){
      setOrder({})
      setByCategory(false)
      setByThema(false)
      setPageNum(1)
      setKeywordUsed('')

      try {
        const {data} = await axios.get(URL+'pageNumber=1&unitsPerPage=12');
        console.log(URL+'pageNumber=1&unitsPerPage=12')
        console.log(data)
        setProducts(data)
       setLoading(false);
      } catch (error) {
        console.error(error)
        setLoading(false);
      }

    } else{




    

   

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
          setOrder({active:'price', order:'DESC'})
        } else if(pattern.order === 'Lowest price first'){
          orderPrice = `&priceOrder=ASC`
          setOrder({active:'price', order:'ASC'})
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
    const {data} = await axios.get(URL+pageNumber+unitsPerPage+keyword+category+thema+orderName+orderPrice);
    console.log(URL+pageNumber+unitsPerPage+keyword+category+thema+orderName+orderPrice)
    console.log(data)
    setProducts(data)
   setLoading(false);
  } catch (error) {
    console.error(error)
    setLoading(false);
  }
}
  }



  return { products, notSuggestion, loading, error, handleGetSuggestions, getProducts};
}

export default useGetSuggestionFromBack;
