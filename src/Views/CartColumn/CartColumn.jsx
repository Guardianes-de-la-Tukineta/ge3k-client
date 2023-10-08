import React from 'react'
import CartItem from '../../components/CartItem/CartItem';
import style from './CartColumn.module.css'
import { cartStore } from '../../zustand/cartStore/cartStore';

const CartColumn = () => {
    const {cart} = cartStore((state)=>({ //estado de zustand
        cart:state.cart
    }))
    return (
        <div className={`${style.cartColumn}`}>
            <button className='btn btn-warning m-2'>Go to Cart</button>
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