import React, { useState, useEffect } from "react";
import { useAdminStore } from "../ZustandAdmin/AdminStore";

const useOrdersFromBack = () => {
  const { allOrders, getOrdersFromBack } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataFronBack, setDataFronBack] = useState([]);
  const [data, setData] = useState([]);

  const [totalPages, setTotalPages] = useState("");
  const [productByPages, setProductByPages] = useState(12);
  const [pageNum, setPageNum] = useState(1);

  const [filters, setFilters] = useState({})
  const [sortedBy, setSortedBy] = useState({})

  const [aux, setAux] = useState(false)
  
  useEffect(() => {
    const requestZustand = async () => {
      try {
        setLoading(true)
        await getOrdersFromBack();
      } catch (error) {
        console.error(error);
        setLoading(false)
        setError("Error al obtener los datos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    if (allOrders.length === 0) {
      requestZustand();
    }
  }, []);

//Traigo el estado de zustand y me aseguro de guardarlo en DatFromBAck
  useEffect(() => {
    setDataFronBack(allOrders);
  }, [allOrders]);

//Guardar en data los productos de la correspiente pagina
  useEffect(() => {
    if (dataFronBack.length > 0) { // Verifica si los datos ya han terminado de cargarse
      pagination(dataFronBack, pageNum, productByPages)
      setLoading(false);
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
    const orderFiltered = (toFilter || allOrders).filter( order => {
      return (order.status === filters.status) || filters.status === 'Reset' || !filters.status
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

    let copy = [...allOrders]
   
    if (sortedBy.order === "Old First") {
    orderSorted = (toSort || copy).sort((a, b) => {
       {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return aDate - bDate;
      } 
    })
  }
    setPageNum(1);

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

  const reset = ()=>{
    setFilters({})
    setSortedBy({})
    setPageNum(1);
    setDataFronBack(allOrders)
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
    error,
  };
};

export default useOrdersFromBack;
