import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import style from './CardProduct.module.css'
import { useNavigate } from 'react-router-dom';

const CardProduct = ({ name, description, id, image, price }) => {
    //Estados
    const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
    const navigate = useNavigate(); // para re dirigir a /detail por ejemplo

    //handlers
    const handlerIsFav = (e) => {
        e.stopPropagation(); // evita q el click se propague al elemento padre
        isFav ?
            setIsFav(false)
            : setIsFav(true)
    }
    const handlerNavigate = () => {
        navigate(`/product/${id}`)
    }
    const handlerCart = (e) => {
        e.stopPropagation() // evita q el click se propague al elemento padre
    }
    return (
        <div className={`col-md-6 col-lg-4 d-flex ${style.divCard}`}>

            <Card className={`col-md-12 mb-3 pt-3 mt-3 ${style.card}`}>
                <Card.Img variant="top" src={image} />
                <Card.Body onClick={handlerNavigate} className='d-flex flex-column justify-content-around'>
                    <Card.Title  >{name}</Card.Title>
                    <Card.Text className={style.description}>{description}</Card.Text>
                    <Card.Text >$ {price}</Card.Text>
                    <Card.ImgOverlay>
                        <button className={style.fav} onClick={handlerIsFav}>
                            {
                                !isFav ? <i className="bi bi-suit-heart"></i> : <i className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
                            }
                        </button>
                    </Card.ImgOverlay>
                    <Button onClick={handlerCart} className={style.addCart}><i className="bi bi-cart"></i> Add to cart</Button>
                </Card.Body>
            </Card>
        </div>


    );
}


export default CardProduct;

