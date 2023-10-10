import React, { useEffect } from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';
import { useNavigate } from 'react-router-dom';

const CartColumn = () => {
    //hooks y estados    
    const {cart,subTotal,getSubTotal,updateLocalStorage,visibility,setVisibility,syncByBack} = cartStore() // estados y variables de zustand
    const navigate=useNavigate()
    useEffect(()=>{
        //syncByBack()
        getSubTotal() // obtenemos el subtotal para mostrar   
        updateLocalStorage(cart) // cada q cambia cart del zustand actualizamos local storage
        return()=>{
            updateLocalStorage([]) // cuando se desmonta el componente sin ningun producto en cart limpiamos el local storage
        }    
    },[cart])
    //handlers
    const handlerPay=()=>{
        navigate('/purchaseOrder')
        setVisibility() // ocultamos barra lateral
    }
    
    return (
        <div className={`${style.cartColumn} ${(cart.length>0 && visibility)? style.fadeIn : style.fadeOut}`}>
            <strong className='text-center m-0'>
                Subtotal
                <br></br> 
                ${subTotal}
            </strong>
            <div className='d-flex justify-content-center'>
                <button className={`${style.buttonCart} btn btn-warning m-2 pt-0 pb-0`}>Go Cart</button>
                <button onClick={()=>handlerPay()} className={`${style.buttonCart} btn btn-warning m-2 pt-0 pb-0`}>Pay</button>
            </div>
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