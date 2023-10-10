import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import style from './CardProduct.module.css'
import { useNavigate } from 'react-router-dom';
import { cartStore } from '../../zustand/cartStore/cartStore';

const CardProduct = ({ name, description, id, image, price }) => {
    //Estados
    const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
    const navigate = useNavigate(); // para re dirigir a /detail por ejemplo
    const {addProductToCart,setVisibility}=cartStore() //cart store de zustand
    
    //handlers
    const handlerIsFav = (e) => {
        e.stopPropagation(); // evita q el click se propague al elemento padre
        isFav ?
            setIsFav(false)
            : setIsFav(true)
    }
    const handlerCart = (e) => {
        e.stopPropagation(); // evita q el click se propague al elemento padre        
        addProductToCart({ name, description, id, image, price })
        setVisibility(true)
    }
    const handlerNavigate = () => {        
        navigate(`/product/${id}`)        
    }
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

