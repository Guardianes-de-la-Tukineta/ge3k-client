import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import style from './CardProduct.module.css'
import { useNavigate } from 'react-router-dom';
import { cartStore } from '../../zustand/cartStore/cartStore';
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from '../../zustand/customerStore/customerStore';
import { favoriteStore } from '../../zustand/favoriteStore/favoriteStore';

const CardProduct = ({ name, description, id, image, price }) => {
    //Estados
    const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
    const [isFavDisabled, setIsFavDisabled] = useState(false); // para deshabilitar momentaneamente el boton de fav
    const navigate = useNavigate(); // para re dirigir a /detail por ejemplo
    const {addProductToCart,setVisibility}=cartStore() //cart store de zustand
    const { isAuthenticated } = useAuth0() // para saber si estoy logueado
    const {currentCustomer}=customerStore() 
    const {favorites,addProductFavorite,deleteProductFavorite,updateLocalStorage} = favoriteStore()
    //handlers
    const handlerIsFav = (e) => {
        e.stopPropagation(); // evita q el click se propague al elemento padre        
        if (isFavDisabled) { //evita q el user haga click dos veces seguidas al fav sin dar tiempo de procesar en back
            return;
        }
        setIsFavDisabled(true);
        if(!isFav) { //si no esta en favoritos ya
            addProductFavorite(isAuthenticated,currentCustomer.id,{ name, description, id, image, price })                        
            setIsFav(true)
        } else {
            deleteProductFavorite(isAuthenticated,currentCustomer.id, id)  
            setIsFav(false)         
        }  
        // Habilitar el botón después de 1 seg
        setTimeout(() => {
            setIsFavDisabled(false);
        }, 1000);      
    }
    const handlerCart = (e) => {
        e.stopPropagation(); // evita q el click se propague al elemento padre        
        addProductToCart(isAuthenticated || false,currentCustomer.id,{ name, id, image, price })
        setVisibility(true)
    }
    const handlerNavigate = () => {        
        navigate(`/product/${id}`)        
    }
    useEffect(()=>{
        updateLocalStorage(favorites)
        if(favorites.findIndex((elem)=>elem.id===id)!==-1) { //si esta en favoritos pintamos el corazon
            setIsFav(true)  
        } 
    },[favorites])

    return (
        <div className={`col-md-6 col-lg-4 d-flex ${style.divCard}`}>
            <Card className={`col-md-12 mb-3 pt-3 mt-3 ${style.card}`}>
                <Card.Body onClick={handlerNavigate} className='d-flex flex-column justify-content-around'>
                    <Card.Img variant="top" src={image}/>
                    <Card.Title  >{name}</Card.Title>
                    <Card.Text className={style.description}>{description}</Card.Text>
                    <Card.Text >$ {price}</Card.Text>                    
                    <button className={style.fav} onClick={(e)=>handlerIsFav(e)}>
                        {
                            !isFav ? <i className="bi bi-suit-heart "></i> : <i className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
                        }
                    </button>                    
                    <Button onClick={(e)=>handlerCart(e)} className={style.addCart}><i className="bi bi-cart"></i> Add to cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
export default CardProduct;

