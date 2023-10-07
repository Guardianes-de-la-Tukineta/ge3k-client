import React from 'react'
import style from './CartItem.module.css'
import Dropdown from 'react-bootstrap/Dropdown';

const CartItem = ({name,price,image}) => {

    return (
        <div className={`card ${style.cartItem}`}>
            <div className='card-body d-flex flex-column w-100 h-100 '>
                <img
                    src={image}
                    alt={name}
                />
                <div className='text-center'>
                    ${price}
                </div>
                <div className='d-flex justify-content-between'>                    
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                           1
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">3</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">4</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                                      
                    <button className='btn btn-dark'>
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>          
        </div>
    );
}
 
export default CartItem;