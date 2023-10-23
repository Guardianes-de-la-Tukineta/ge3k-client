import React, { useState, useEffect } from "react";
import { useAdminStore } from "../ZustandAdmin/AdminStore";
import axios from "axios";

const useOrdersFromBack = () => {
  const { allOrders, getOrdersFromBack } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [dataFronBack, setDataFronBack] = useState([]);
  const [data, setData] = useState([]);

  const [totalPages, setTotalPages] = useState("");
  const [productByPages, setProductByPages] = useState(12);
  const [pageNum, setPageNum] = useState(1);

  const [filters, setFilters] = useState({})
  const [sortedBy, setSortedBy] = useState({})

  const [aux, setAux] = useState(false)
  const [byEmail, setByEmail] = useState(false)
  
  useEffect(() => {
    const requestZustand = async () => {
      try {
        setLoading(true)
        await getOrdersFromBack();
      } catch (error) {
        handleCatchError(error)
      }
    };
    if (allOrders.length === 0) {
      requestZustand();
    }
  }, []);

//Traigo el estado de zustand y me aseguro de guardarlo en DatFromBAck
  useEffect(() => {
  if (allOrders.length > 0) { // Verifica si los datos ya han terminado de cargarse
      setDataFronBack(allOrders);
  } 
  }, [allOrders]);

//Guardar en data los productos de la correspiente pagina
  useEffect(() => {

    if(dataFronBack.length > 0) {
      pagination(dataFronBack, pageNum, productByPages)
    } else if (allOrders.length > 0){
      setData([])
      setTotalPages(1)
    }
  }, [dataFronBack, pageNum, aux]);


  //Detecta los cambios de filtros
  useEffect(()=>{
    if(filters.hasOwnProperty('status')){
    handleFilter()
  }
  },[filters])

  //Detecta los cambios de filtros
  useEffect(()=>{
    if(sortedBy.hasOwnProperty('order')){
      hanldeSort()
    }
  },[sortedBy])




  //Catch Handler
  const handleCatchError= (error)=>{
    setLoading(false)
          if(error.response){
            if(error.message === "Request failed with status code 404"){
              setError("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
            setTimeout(() => {
              setError(false)
            }, 5000)
          } else if(error.response.data.message) {
            setError(error.response.data.message)
            setTimeout(() => {
              setError(false)
            }, 5000)
          }
          } else {
            setError('Could not retrieve a response from the server. Please check your Internet connection')
            setTimeout(() => {
              setError(false)
            }, 5000);
          }
  }

  //Paginación
  function pagination(productos, paginaActual, productosPorPagina) {
    // Calcular el total de páginas
  
    let totalPaginas = Math.ceil(productos.length / productosPorPagina);
    
    // Calcular el índice de inicio y fin para los productos de la página actual
    let inicio = (paginaActual - 1) * productosPorPagina;
    let fin = inicio + productosPorPagina;

    let productosPagina = productos.slice(inicio, fin);
    setData(productosPagina);
    setTotalPages(totalPaginas);
    setLoading(false);
  }

  //Filtra por status
  const handleFilter = (toFilter) => {

    const orderFiltered = ( toFilter || allOrders).filter( order => {
        return ((order.status === filters.status) || filters.status === 'Reset' || !filters.status) && ((byEmail)? order.email === byEmail: true)
      })
    
      setPageNum(1)
 
    if(toFilter){
      setDataFronBack(orderFiltered)
    } else if(sortedBy.order === "Old First"){
     hanldeSort(orderFiltered)
   } else {
     setDataFronBack(orderFiltered)
   }
  }


 //Ordera por fecha
  const hanldeSort = (toSort) => {
    let orderSorted = allOrders;

    let copy = [...orderSorted]
   
    if (sortedBy.order === "Old First") {
    orderSorted = (toSort || copy).sort((a, b) => {
       {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return aDate - bDate;
      } 
    })
  }
      
    setPageNum(1)
 
    if (toSort) {
      setDataFronBack(orderSorted); 
      setAux(!aux);
      return;
    } else if (filters.hasOwnProperty("status") && filters.status !== 'Reset') {
      handleFilter(orderSorted);
      setAux(!aux);
      return;
    } else {
      setDataFronBack(orderSorted);
      setAux(!aux);
      return;
    }
  };

  //Reset
  const reset = ()=>{
    setFilters({})
    setSortedBy({})
    setPageNum(1)
    setByEmail(false)
    setDataFronBack(allOrders)
  }



  const handleCompleteOrder = async (orderId) => {
    const URL = "https://ge3k-server.onrender.com/orders/fulfill/";
    const URLGet = "https://ge3k-server.onrender.com/orders";
    const dataForRequest = {
      orderId,
    };
    try {
      await axios.put(URL, dataForRequest);
   

      if (pageNum !== 1 || sortedBy.hasOwnProperty("order") || filters.hasOwnProperty("status")) {
        console.log('lplplplplpl')
        const { data } = await axios.get(URLGet);
        if (sortedBy.order === "Old First") {
          data.sort((a, b) => {
            {
              const aDate = new Date(a.createdAt);
              const bDate = new Date(b.createdAt);
              return aDate - bDate;
            }
          });
        } else {
          data.sort((a, b) => {
            {
              const aDate = new Date(a.createdAt);
              const bDate = new Date(b.createdAt);
              return bDate - aDate;
            }
          });
        }

        const ordersFiltered = data.filter((order) => {
          return (
            (order.status === filters.status ||
              filters.status === "Reset" ||
              !filters.status) &&
            (byEmail ? order.email === byEmail : true)
          );
        });
        setDataFronBack(ordersFiltered);
      } else{
        await getOrdersFromBack()
      }

      setMessage("Order completed successfully");
      setTimeout(() => {
        setMessage("");
      }, 3500);
    } catch (error) {
      handleCatchError(error);
    }
  };



  const handleSearchByEmail = (email)=>{
    const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailTest.test(email)){
      setPageNum(1)
      setByEmail(email)
      const ordersByEmail = allOrders.filter(order => order.email === email)
      setDataFronBack(ordersByEmail)
    } else{
      setError('Invalid email')
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }


  return {
    data,
    loading,
    pageNum,
    setFilters,
    setSortedBy,
    setPageNum,
    reset,
    totalPages,
    getOrdersFromBack,
    handleCompleteOrder,
    handleSearchByEmail,
    error,
    message
  };
};

export default useOrdersFromBack;
