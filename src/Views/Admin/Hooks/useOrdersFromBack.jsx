import React, { useState, useEffect } from "react";
import { useAdminStore } from "../ZustandAdmin/AdminStore";

const useOrdersFromBack = () => {
  const { allOrders, getOrdersFromBack } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataFronBack, setDataFronBack] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [productByPages, setProductByPages] = useState(12);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);

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


  useEffect(() => {
    setDataFronBack(allOrders);
  }, [allOrders]);

  useEffect(() => {
    if (dataFronBack.length > 0) { // Verifica si los datos ya han terminado de cargarse
      pagination(dataFronBack, pageNum, productByPages)
      setLoading(false);
  }
  }, [dataFronBack, pageNum]);


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

  return {
    data,
    loading,
    pageNum,
    setPageNum,
    totalPages,
    getOrdersFromBack,
    error,
  };
};

export default useOrdersFromBack;
