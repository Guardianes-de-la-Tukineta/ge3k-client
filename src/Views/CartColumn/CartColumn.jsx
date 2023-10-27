import React, { useEffect } from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
import { customerStore } from '../../zustand/customerStore/customerStore';

const CartColumn = () => {
    //hooks y estados    
    const location = useLocation();
    const {cart,subTotal,getSubTotal,updateLocalStorage,visibility,setVisibility,deleteCart} = cartStore() // estados y variables de zustand       
    const navigate=useNavigate()
    const {isAuthenticated } = useAuth0() // para saber si estoy logueado
    const { currentCustomer } = customerStore()
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
    const handlerClearCart=()=>{
        deleteCart(isAuthenticated,currentCustomer.id)
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
                <button onClick={()=>handlerPay()} className={`${style.buttonCart} btn btn-warning m-2 pt-0 pb-0`}>GoCart</button>
                <button onClick={()=>handlerClearCart()} className={`${style.buttonClear} btn btn-dark m-2 pt-0 pb-0`}><i class="bi bi-trash2">Clean</i></button>
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