import React from 'react'
import { Card} from 'react-bootstrap';
import style from './CardProductAdmin.module.css'

const CardProductAdmin= ({ name, description, image, price, discount, stock, category, theme }) => {

    return (
        <div className={`d-flex ${style.divCard} justify-content-center aling-item-center`}>

            <Card className={`col-md-12 mb-3 p-2 mt-3 ${style.card}`}>
           
                <div className={style.imgContainer}>

                    {!image? <i className="bi bi-image"></i>: <img src={image} />}
                     </div>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title  className='mb-1'>{name}</Card.Title>
                    <Card.Text className={`${style.description} className='mb-1'`}>{description}</Card.Text>
                    <Card.Text className='mb-1'><strong>Price:</strong> {price && '$'}{price}</Card.Text>
                    <Card.Text className='mb-1'> <strong>Discount:</strong> {discount}</Card.Text>
                    <Card.Text className='mb-1'><strong>Stock:</strong> {stock}</Card.Text>
                    <Card.Text className='mb-1'><strong>Category:</strong>  {category}</Card.Text>
                    <Card.Text className='mb-1'> <strong>Theme:</strong> {theme}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}


export default CardProductAdmin;

