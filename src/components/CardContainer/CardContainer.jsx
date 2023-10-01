import React, {useState } from "react";
import { useStore } from "../../zustand/useStore/useStore";
import CardProduct from "../CardProduct/CardProduct";
import style from './CardContainer.module.css'
import PaginationCards from "../Pagination/PaginationCards";

const CardContainer = () => {
    //estados 
    const[cardsPerPagin,setCardsPerPagin]=useState(12); //numero de targetas por pag.para mostrar
    const[currentPage,setCurrentPage] =useState(1) // pag. actual

    const { currentProducts } = useStore((state)=>({ //nos traemos la variable global
        currentProducts:state.currentProducts
    }))
    const totalProducts=currentProducts.length // para saber el total de productos q vienen del back

    const showProducts=currentProducts.slice(currentPage*cardsPerPagin-cardsPerPagin, currentPage*cardsPerPagin) //logica para rebanar el array total, y mostrar solo las cardsperpag correspondientes
    
    return (
        <div className="row d-flex align-items-center justify-content-center">       
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