import { useEffect, useState} from "react";
import axios from "axios";

function useGetSuggestionFromBack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState('')
  const [notSuggestion, setNotSuggestion] = useState(false)
  const [keywordUsed, setKeywordUsed] = useState('')


  const [orderByName, setOrderByName] = useState({})
  const [orderByPrice, setOrderByPrice] = useState({})
  const [byCategory, setByCategory] = useState(false)
  const [byThema,setByThema] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [productByPage, setProductByPage] = useState(12)


  const reset = ()=>{
    setOrderByName({})
    setOrderByPrice({})
    setByCategory(false)
    setByThema(false)
    setPageNum(1)
  }
  
  const handleGetSuggestions = async (keyword) => {
    const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    setLoading(true);
    setKeywordUsed(keyword)
    if (uuidPattern.test(keyword)) {
      try {
        const URL = "https://ge3k-server.onrender.com/products/";
        const {data} = await axios.get(URL + keyword);
        reset()
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
        reset()
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

    console.log('sgdsgagsgfgadfgadfgadfgdfagadf')
    console.log(pattern)

    setLoading(true);
    const URL = 'https://ge3k-server.onrender.com/products?'

    let pageNumber =`pageNumber=${pageNum}`;
    let unitsPerPage = `&unitsPerPage=${productByPage}`;
    let keyword = (keywordUsed)?`&name=${keywordUsed}`:'';
    let category = (byCategory) ? `&categoryName=${byCategory}` : '';
    let thema = (byThema) ? `&themeName=${byThema}` : '';
    let orderName = (orderByName.active) ? `&nameOrder=${orderByName.order}` : '';
    let orderPrice = (orderByPrice.active) ? `&priceOrder=${orderByPrice.order}` : '';

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

    if(pattern.name){
      if(pattern.name === 'A-Z'){
        orderName = `&nameOrder=ASC`
        setOrderByName({active:true, order:'ASC'})
      } else if(pattern.name === 'Z-A'){
        orderName = `&nameOrder=DESC`
        setOrderByName({active:true, order:'DESC'})
      } else{
        orderName =''
        setOrderByName({})
      }
      }
      

    if(pattern.price){
      if(pattern.price === 'Highest price first'){
        orderPrice = `&priceOrder=DESC`
        setOrderByPrice({active:true, order:'DESC'})
      } else if(pattern.price === 'Lowest price first'){
        orderPrice = `&priceOrder=ASC`
        setOrderByPrice({active:true, order:'ASC'})
      } else{
        orderPrice =''
        setOrderByPrice({})
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



  return { keywordUsed, products, notSuggestion, loading, error, handleGetSuggestions, getProducts};
}

export default useGetSuggestionFromBack;
