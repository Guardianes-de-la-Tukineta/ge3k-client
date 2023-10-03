import React, { useState } from "react";
import { useStore } from "../../zustand/useStore/useStore";
import CardProduct from "../CardProduct/CardProduct";
import PaginationCards from "../Pagination/PaginationCards";
import style from './CardContainer.module.css'

const CardContainer = () => {
    //estados 
    const [cardsPerPagin, setCardsPerPagin] = useState(12); //numero de targetas por pag.para mostrar
    const [currentPage, setCurrentPage] = useState(1) // pag. actual

    const { currentProducts } = useStore((state) => ({ //nos traemos la variable global
        currentProducts: state.currentProducts
    }))
    const totalProducts = currentProducts.length // para saber el total de productos q vienen del back   
    const showProducts = currentProducts.slice(currentPage * cardsPerPagin - cardsPerPagin, currentPage * cardsPerPagin) //logica para rebanar el array total, y mostrar solo las cardsperpag correspondientes
       
    return (
        <div className="row">
            {
                showProducts.map((product) => (
                    <CardProduct
                        name={product.name}
                        key={product.id}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                    />
                ))
            }
            <div className='d-flex justify-content-center'>
                {
                    totalProducts > cardsPerPagin &&
                    <PaginationCards
                        cardsPerPagin={cardsPerPagin}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalProducts={totalProducts}
                    />
                }
            </div>
        </div>

    )

}


export default CardContainer;
