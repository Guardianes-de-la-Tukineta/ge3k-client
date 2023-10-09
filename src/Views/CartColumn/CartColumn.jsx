import React, { useEffect } from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';

const CartColumn = () => {
    const {cart,subTotal,getSubTotal,updateLocalStorage} = cartStore() // estados y variables de zustand
    console.log(cart);
    //hooks      
    useEffect(()=>{
        getSubTotal() // obtenemos el subtotal para mostrar   
        updateLocalStorage(cart) // cada q cambia cart del zustand actualizamos local storage
        
        return()=>{
            updateLocalStorage([]) // cuando se desmonta el componente sin ningun producto en cart limpiamos el local storage
        }    
    },[cart])

    return (
        <div className={`col-md-1 ${style.cartColumn} ${cart.length>0 ? style.fadeIn : style.fadeOut}`}>
            <strong className='text-center'>
                Subtotal
                <br></br> 
                ${subTotal}
            </strong>
            <button className={`${style.buttonCart} btn btn-warning m-2`}>Go to Cart</button>
            <aside>               
                {   
                    cart.map(({product})=>(
                        <CartItem
                            key={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            id={product.id}
                        />
                    ))
                }                  
            </aside>
        </div>
    );
}
 
export default CartColumn;