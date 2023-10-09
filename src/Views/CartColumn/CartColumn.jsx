import React, { useEffect, useState } from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';

const CartColumn = () => {
    const {cart,subTotal,getSubTotal} = cartStore((state)=>({ //estado de zustand
        cart:state.cart,
        subTotal:state.subTotal,
        getSubTotal:state.getSubTotal
    }))
    const [isVisible, setIsVisible] = useState(true); //para aplicar animacion
   
    //hooks      
    useEffect(()=>{
        getSubTotal() // obtenemos el subtotal para mostrar
        if (cart.length === 0) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
    },[cart])

    return (
        <div className={`col-md-1 ${style.cartColumn} ${isVisible ? style.fadeIn : style.fadeOut}`}>
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