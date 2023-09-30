import React, { useState } from 'react'
import { Card,Button } from 'react-bootstrap';
import style from './CardProduct.module.css'

const CardProduct = ({name,description,id,img,price}) => {
    //Estados
    const[isFav,setIsFav]=useState(false); // para cambiar el estado de fav y no fav

    //handlers
    const handlerIsFav=()=>{
        isFav ?
         setIsFav(false)
         : setIsFav(true)
    }
    return (        
        <Card className={`col-md-4 col-lg-2 mb-4 ${style.card}`}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCkeJVDJ3xsvm_lBaCqZW9FB3-0A1gticFA&usqp=CAU"/>
            <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{price}</Card.Text>
            <Card.ImgOverlay><button className={style.fav} onClick={()=>handlerIsFav()}>
                {
                    !isFav ? <i className="bi bi-suit-heart"></i> : <i className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
                }
                
                </button>
            </Card.ImgOverlay>
            <Button className={style.addCart}><i className="bi bi-cart"></i> Add to cart</Button>
            </Card.Body>
      </Card>
    );
}
 
export default CardProduct;