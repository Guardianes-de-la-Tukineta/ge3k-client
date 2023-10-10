import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../customerStore/customerStore";

export const cartStore = create(zukeeper((set) => ({
    cart: JSON.parse(window.localStorage.getItem("cart")) || [], // productos en carrito de compra
    subTotal: 0, // guarda el subTotal en el carrito
    visibility:true, // para cuando se le da al icono del carrito del navBar
    
  
    //cambiar de visibilidad
    setVisibility: (atribute) => {
        !atribute ?  //si no mandamos atributo
        set(prevState=>({
            visibility:prevState.visibility?false:true //cambiamos la visibilidad 
        }))    
        : 
        set(prevState=>({
            visibility:atribute //cambiamos la visibilidad con el true o false que venga 
        })) 

    },
    //update localStorage con estado global
    updateLocalStorage: (newState) => {
        window.localStorage.setItem("cart",JSON.stringify(newState))
    },      
    //obtiene los productos q hay en carrito
    getCartProducts: async () => {
        try {
            const cartProducts = await axios.get('https://ge3k-server.onrender.com/cart')
            set(prevState => ({
                ...prevState,
                cart: cartProducts
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a cart
    addProductToCart: (newProduct) => {
        const cart = cartStore.getState().cart;
        if (cart.findIndex(({ product }) => product.id === newProduct.id) < 0) {          
            set(prevState => ({
                ...prevState,
                cart: [...prevState.cart, { product: newProduct, quantity: 1 }]
            }))          
        }       
    },
    //eliminar producto de cart
    deleteProductCart: (id) => {
        const cart = cartStore.getState().cart;
        const result = cart.filter(({ product }) => product.id !== id)
        set(prevState => ({
            ...prevState,
            cart: result
        }))
    },
    //modificar cantidad de producto en carrito
    setQuantity: (id, cant) => {
        const cart = cartStore.getState().cart;
        const newCart = cart.map(({ product, quantity }) => {
            if (product.id === id) {
                quantity = cant
            }
            return { product, quantity }
        })
        console.log(newCart);
        set(prevState => ({
            ...prevState,
            cart: newCart
        }))
    },
    //obtener SubTotal en el precio del carrito
    getSubTotal: () => {
        const cart = cartStore.getState().cart;        
        const subTotal = cart.reduce((accumulator, item) => { // calculamos el subtotal de los precios en el carrito
            const price = item.product.price;
            const quantity = item.quantity;
            return accumulator + (price * quantity);
        }, 0);// inicial valor por si el array esta vacio
        
        set(prevState => ({
            ...prevState,
            subTotal:subTotal.toFixed(2) // fixed da decimales maximos para mostrar
        }))        
    },
      //conectar con back
      syncByBack:()=>{
        try {
            const { user, isAuthenticated } = useAuth0()
            const {currentCustomer}=customerStore()
            
            if(isAuthenticated) {
                console.log('estoy logueado');
                console.log(user.email);           
                console.log(currentCustomer);
                
            }
            
        } catch (error) {
            console.log(error);
        }
        
    },
    
})))

window.store = cartStore