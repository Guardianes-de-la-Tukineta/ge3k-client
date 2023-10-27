import React, { useEffect } from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { useLocation } from 'react-router-dom';

const CartColumn = () => {

    const location = useLocation();
    //hooks y estados    
    const {cart,subTotal,getSubTotal,updateLocalStorage,visibility,setVisibility} = cartStore() // estados y variables de zustand       
    const navigate=useNavigate()
    const {isAuthenticated } = useAuth0() // para saber si estoy logueado

    const isCancelPage = location.pathname === "/cancel";  //oculta la barra del carrito mientras cancel está renderizado
    const shouldShowCartColumn = cart.length > 0 && visibility && !isCancelPage;

    useEffect(()=>{  
        if(!isAuthenticated) getSubTotal() // obtenemos el subtotal para mostrar si no esta autenticado   
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
        <div className={`${style.cartColumn} ${(shouldShowCartColumn) ? style.fadeIn : style.fadeOut}`}>
        {/* // <div className={`${style.cartColumn}   ${(cart.length>0 && visibility)? style.fadeIn : style.fadeOut}`}> */}
            <strong className='text-center m-0'>
                Subtotal
                <br></br> 
                ${subTotal}
            </strong>
            <div className='d-flex justify-content-center'>                
                <button onClick={()=>handlerPay()} className={`${style.buttonCart} btn btn-warning m-2 pt-0 pb-0`}>Go Cart</button>
            </div>
            <aside>               
                {   
                   (cart && cart.length>0) && cart.map(({product})=>(
                        <CartItem
                            key={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            id={product.id}
                            discount={product.discount}
                        />
                    ))
                }                  
            </aside>
        </div>
    );
}
 
export default CartColumn;