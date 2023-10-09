import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const cartStore = create(zukeeper((set) => ({
    cart: JSON.parse(window.localStorage.getItem("cart")) || [], // productos en carrito de compra
    subTotal: 0, // guarda el subTotal en el carrito
    
    
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

    //  middleware para q cada que cambien cart primero actualice el localstorage
    // onSet: (getState, setState, fn) => {
    //     // Intercepta el cambio de 'cart'
        
    //         // Actualiza el Local Storage con el nuevo valor de 'cart'
    //         console.log(fn.cart);
    //         window.localStorage.setItem("cart", JSON.stringify(fn.cart));
        
    //     // Continúa con la actualización del estado
    //     setState(fn);
    // },
})))

window.store = cartStore