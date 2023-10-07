import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const cartStore = create(zukeeper((set) => ({
    cart:[], // productos en carrito de compra

    //obtiene los productos q hay en carrito
    getCartProducts: async()=>{
        try {
            const cartProducts= await axios.get('https://ge3k-server.onrender.com/cart')
            set(prevState=>({
                ...prevState,
                cart:cartProducts
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a cart
    addProductToCart: (newProduct)=>{
        const cart=cartStore.getState().cart;        
        if(cart.findIndex(({product})=>product.id===newProduct.id)<0){
            set(prevState=>({
                ...prevState,
                cart:[...prevState.cart,{product:newProduct,quantity:1}]
            }))
        }
    }

})))