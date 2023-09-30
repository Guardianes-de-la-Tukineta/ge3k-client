import React, { useEffect, useState } from "react";
import { useStore } from "../../zustand/useStore/useStore";
import CardProduct from "../CardProduct/CardProduct";
import { useLocation} from "react-router-dom";
import style from './CardContainer.module.css'
import PaginationCards from "../Pagination/PaginationCards";

const CardContainer = () => {
    //estados 
    const[cardsPerPagin,setCardsPerPagin]=useState(10); //numero de targetas por pag.para mostrar
    const[currentPage,setCurrentPage] =useState(1) // pag. actual

    const titleCategory=useLocation().pathname   //para poner el titulo H1 
    const { getCurrentProducts } = useStore() //esto actua como nuestro dispatch  
    const { currentProducts } = useStore((state)=>({ //nos traemos la variable global
        currentProducts:state.currentProducts
    }))
    const totalProducts=currentProducts.length // para saber el total de productos q vienen del back
    const showProducts=currentProducts.slice(currentPage-1, currentPage+cardsPerPagin-1) //logica para rebanar el array total, y mostrar solo las cardsperpag correspondientes
    //Hooks
    useEffect(() => {
        getCurrentProducts() //al montar componente ejecutamos la action q modifica nuestro estado global
    },[currentPage])

    return (
        <div className="row d-flex align-items-center justify-content-center">  
            <h1 className={style.titleH1}>{titleCategory.slice(1,2).toUpperCase().concat(titleCategory.slice(2))}</h1>       
            {
                showProducts.map((product)=>(
                    <CardProduct
                        name={product.name}
                        key={product.id}
                        description={product.description}
                        price={product.price}
                    />
                ))
            }
            <div className={style.paginationCards}>
                <PaginationCards 
                    cardsPerPagin={cardsPerPagin} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    totalProducts={totalProducts}
                /> 
            </div>
        </div>
          
    )
    
}

export default CardContainer;