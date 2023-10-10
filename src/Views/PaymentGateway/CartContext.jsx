import { createContext, useState } from "react";
import {  products, getProductData } from "./PaymentGateway";


export const CartTest = createContext({
    items: [],
    getProductQuantity: ()=> { },
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
})


export const CartProvider = ({children}) => {

    const [ cartProducts, setCartProducts ] = useState([]);

    //id: 234jffj56-2133421rf, quantity: 3

    const getProductQuantity = (stripe) => {

       const quantity = cartProducts.find(product => product.stripe === stripe)?.quantity

       if(quantity === undefined){
        return 0;
       }
       return quantity;
    }

    const addOneToCart = (stripe) => {
        const quantity = getProductQuantity(stripe);
        if(quantity === 0) { //product is not in the cart
            setCartProducts(
           [
            ...cartProducts, 
            {
                id: stripe,
                quantity: quantity +1
            }
           ]
        )}
        else {  //product is in the cart
            setCartProducts(
                  cartProducts.map(
                    product =>
                     product.stripe=== stripe ? {...product, quantity: product.quantity + 1 } : product

                   )
                
            )
        
        }

    }

    const removeOneFromCart = (stripe) => {
        const quantity = getProductQuantity(stripe);

        if(quantity == 1){
            deleteFromCart(stripe);
        }
        else {
            setCartProducts(
                cartProducts.map(
                  product =>
                   product.stripe === stripe ? {...product, quantity: product.quantity - 1 } : product

                 )
          )
        }
    }

    const deleteFromCart = (stripe) => {
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.stripe !== stripe;
            })
        )
    }


    const getTotalCost = () => {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        })
        return totalCost;
    }



    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }
    return(
    <CartTest.Provider value={contextValue}>
        {children}
    </CartTest.Provider>
    )
}

export default CartProvider;
//The code down here



//Context (cart, addToCart, removeCart)
//Provider -> gives access of React app to all the things in the context
