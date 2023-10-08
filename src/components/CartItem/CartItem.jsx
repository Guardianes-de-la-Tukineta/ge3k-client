import React, { useState } from 'react'
import style from './CartItem.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { cartStore } from '../../zustand/cartStore/cartStore';

const CartItem = ({name,price,image,id}) => {
    //estados y actions
    const {deleteProductCart,setQuantity} = cartStore() //nos traemos action de zustand    
    const {cart} = cartStore((state)=>({ //variable de zustand
        cart:state.cart
    }))
    const cantidadActual= cart.find(({product})=>product.id===id).quantity // sabremos que cantidad tiene cada product
    
    //handlers
    const handlerDeleteProduct =()=>{
        deleteProductCart(id)
    }
    const handlerChangeQuantity=(e)=>{
        const value = Number(e.target.innerText)             
        setQuantity(id,value)
    }

    // Generar las opciones del menú desplegable usando un bucle for
     const dropdownOptions = [];
     for (let i = 1; i < 11; i++) {
         dropdownOptions.push(
             <Dropdown.Item key={i} onClick={(e) => handlerChangeQuantity(e)}>{i}</Dropdown.Item>
         );
     }
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
                           {cantidadActual}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {dropdownOptions}
                        </Dropdown.Menu>
                    </Dropdown>
                                      
                    <button onClick={()=>handlerDeleteProduct()} className='btn btn-dark'>
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>          
        </div>
    );
}
 
export default CartItem;